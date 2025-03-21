from datasets import load_dataset, Dataset
from transformers import BertTokenizerFast, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.preprocessing import LabelEncoder
import torch
import pandas as pd

# Loading dataset
df = pd.read_csv("../backend/data/go_emotions.csv")
df = df[['text', 'label']] 
le = LabelEncoder()
df['label'] = le.fit_transform(df['label'])

label_map = dict(zip(le.classes_, le.transform(le.classes_)))

dataset = Dataset.from_pandas(df)

dataset = dataset.train_test_split(test_size=0.2)
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')
def tokenize(example):
    return tokenizer(example['text'], padding='max_length', truncation=True)

dataset = dataset.map(tokenize)
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(label_map))

training_args = TrainingArguments(
    output_dir="model",
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=4,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_dir="./logs",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset['train'],
    eval_dataset=dataset['test'],
    tokenizer=tokenizer
)

trainer.train()
trainer.save_model("model")
tokenizer.save_pretrained("model/tokenizer")

import json
with open("model/label_map.json", "w") as f:
    json.dump(label_map, f)
