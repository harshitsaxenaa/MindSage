import shap
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class SHAPExplainer:
    def __init__(self, model_path, tokenizer_path):
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.model.eval()

        def f(x):
            tokens = [self.tokenizer(text, return_tensors='pt', padding=True, truncation=True) for text in x]
            outputs = [self.model(**t).logits.detach().numpy() for t in tokens]
            return np.vstack(outputs)

        self.explainer = shap.Explainer(f, shap.maskers.Text(self.tokenizer))

    def explain(self, text):
        explanation = self.explainer([text])
        return explanation
