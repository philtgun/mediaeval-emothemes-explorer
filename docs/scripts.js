document.addEventListener('DOMContentLoaded', function() {
    const plotElement = document.getElementById('plot');
    Plotly.d3.json('./data.json', data => {
        data.type = 'heatmap';
        data.colorscale = 'YlGnBu';
        data.hovertemplate = 'Tag: %{x}<br>Team: %{y}<br>PR-AUC: %{z:.4f}<extra></extra>';
            // '<i>Price</i>: $%{y:.2f}\' +\n' +
            // '                        \'<br><b>X</b>: %{x}<br>\' +\n' +
            // '                        \'<b>%{text}</b>\','
        console.dir(data);
        Plotly.newPlot(plotElement, [data], {
            title: "PR-AUC values per tag for all submissions",
            margin: {l: 320, b: 100, t: 40},
        });
    });
});
