document.addEventListener('DOMContentLoaded', function() {
    const plotElement = document.getElementById('plot');
    Plotly.d3.json('./data.json', data => {
        data.type = 'heatmap';
        data.colorscale = 'YlGnBu';
        data.hovertemplate = 'Tag: %{x}<br>Team: %{y}<br>PR-AUC: %{z:.4f}<extra></extra>';
        // console.dir(data);
        Plotly.newPlot(plotElement, [data], {
            title: "PR-AUC values per tag for all submissions",
            margin: {l: 320, b: 100, t: 40},
        }, {
            responsive: true,
        });
    });
});
