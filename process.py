import argparse
from pathlib import Path
import json

import numpy as np
from sklearn import metrics


def extract_run_name(path):
    run_name = str(path.parts[0]).removesuffix('predictions.npy').strip('-_ /\\')
    return run_name


def load_tags(path):
    tags = np.loadtxt(path, dtype=str)
    return [tag.removeprefix('mood/theme---') for tag in tags]


def main(groundtruth_file, tags_file, output_file, submission_dirs):
    groundtruth = np.load(str(groundtruth_file))
    tags = load_tags(tags_file)

    run_names = []
    data = []
    overall_pr_aucs = []
    added_baseline = False
    for year, submission_dir in zip(submission_dirs[0::2], submission_dirs[1::2]):
        team_dirs = [d for d in Path(submission_dir).iterdir() if d.is_dir()]
        for team_dir in team_dirs:
            team_name = team_dir.stem

            prediction_files = sorted(team_dir.glob('**/*predictions.npy'))
            for prediction_file in prediction_files:
                run_name = extract_run_name(prediction_file.relative_to(team_dir))
                predictions = np.load(str(prediction_file))

                pr_aucs = metrics.average_precision_score(groundtruth, predictions, average=None)

                if not team_name == 'baseline':
                    overall_pr_aucs.append(pr_aucs.mean())
                    data.append(pr_aucs)
                    run_names.append(f'[{year}] {team_name} ({run_name})')
                elif team_name == 'baseline' and run_name == 'vggish' and not added_baseline:
                    overall_pr_aucs.append(pr_aucs.mean())
                    data.append(pr_aucs)
                    run_names.append(f'{team_name} ({run_name})')
                    added_baseline = True

    indices_ranked = np.argsort(overall_pr_aucs)

    plot_data = {
        'x': tags,
        'y': np.array(run_names)[indices_ranked].tolist(),
        'z': np.array(data)[indices_ranked].tolist()
    }

    with open(output_file, 'w') as fp:
        json.dump(plot_data, fp, indent=2)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('groundtruth_file', help='NPY file containing groundtruth')
    parser.add_argument('tags_file', help='TXT file containing list of tags')
    parser.add_argument('output_file', help='Output JSON file')
    parser.add_argument('submission_dirs', nargs='+',
                        help='Directories and the years in the following format: <year> <dir> <year> <dir> ...')
    args = parser.parse_args()
    main(args.groundtruth_file, args.tags_file, args.output_file, args.submission_dirs)
