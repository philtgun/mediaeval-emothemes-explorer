document.addEventListener('DOMContentLoaded', function() {
    let plotElement = document.getElementById('plot');
    Plotly.d3.json('./data.json', data => {
        data.type = 'heatmap';
        data.colorscale = 'YlGnBu';
        console.dir(data);
        Plotly.newPlot(plotElement, [data], {'margin': {'l': 320, 'b': 100, 't': 40}});
    });
});
