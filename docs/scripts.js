document.addEventListener('DOMContentLoaded', function() {
    const plotElement = document.getElementById('plot');

    const urlParams = new URLSearchParams(location.search);
    const sortByPerformance = (urlParams.get('sort') === 'performance')
    if (sortByPerformance) {
        document.getElementById('note').innerHTML = '<a href=".">Sort by number of tracks in training set</a>';
    }
    const dataFile = sortByPerformance ? './data_performance.json' : './data.json';

    fetch(dataFile).then(response => {
        return response.json();
    }).then(data => {
        data.type = 'heatmap';
        data.colorscale = 'YlGnBu';
        data.hovertemplate = 'Tag: %{x}<br>Team: %{y}<br>PR-AUC: %{z:.4f}<extra></extra>';
        // console.dir(data);
        document.getElementById('spinner').hidden = true;
        Plotly.newPlot(plotElement, [data], {
            title: "PR-AUC values per tag for all submissions",
            margin: {l: 380, b: 100, t: 40},
        }, {
            responsive: true,
        });
    });
});
