import pandas as pd
train = pd.read_csv("../data/train.tsv", sep="\t", names=["text", "labels", "id"])
test = pd.read_csv("../data/test.tsv", sep="\t", names=["text", "labels", "id"])
dev = pd.read_csv("../data/dev.tsv", sep="\t", names=["text", "labels", "id"])

df = pd.concat([train, test, dev], ignore_index=True)
with open("../data/emotions.txt", "r") as f:
    emotions = [line.strip() for line in f.readlines()]

df["first_label"] = df["labels"].apply(lambda x: int(x.split(",")[0]))
df["emotion"] = df["first_label"].apply(lambda idx: emotions[idx])
final_df = df[["text", "emotion"]]

final_df.to_csv("../data/go_emotions.csv", index=False)
print("go_emotions.csv created with", len(final_df), "rows.")
