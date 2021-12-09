# MediaEval-EmoThemes-Explorer
App to explore submissions to MediaEval Emotions and Themes in Music task

## Requirements
```shell
python3.9 -m venv venv
source venv/bin/activate
pip install --upgrade pip wheel
pip install -r requrements.txt
```

## Generating data
Windows
```shell
python process.py ..\2020-Emotion-and-Theme-Recognition-in-Music-Task\src\groundtruth.npy ..\mtg-jamendo-dataset\data\tags\moodtheme_split.txt docs\data.json 2019 ..\2019-Emotion-and-Theme-Recognition-in-Music-Task\submissions 2020 ..\2020-Emotion-and-Theme-Recognition-in-Music-Task\submissions --tags-sorted ..\mtg-jamendo-dataset\data\tags\moodtheme_split_sorttracks.txt
```

Linux
```shell
python process.py ../2020-Emotion-and-Theme-Recognition-in-Music-Task/src/groundtruth.npy ../mtg-jamendo-dataset/data/tags/moodtheme_split.txt docs/data.json 2019 ../2019-Emotion-and-Theme-Recognition-in-Music-Task/submissions 2020 ../2020-Emotion-and-Theme-Recognition-in-Music-Task/submissions 2021 ../2021-Emotion-and-Theme-Recognition-in-Music-Task/submissions --tags-sorted ../mtg-jamendo-dataset/data/tags/moodtheme_split_sorttracks.txt
```

## Testing
```shell
cd site
python -m http.server
```

## Generating the figure
```shell
pip install seaborn matplotlib
python export.py docs/data.json docs/figure.pdf
```