const planeInfoTemplate = Handlebars.compile($('#plane-info-template').html());
const planeInfoDiv = $('.plane-info');

function fetchPlaneData() {
  $.ajax({
    url: 'https://data.vatsim.net/v3/vatsim-data.json',
    dataType: 'json',
    success: function(jsonData) {
      const renderedHtml = planeInfoTemplate({ pilots: jsonData.pilots });
      planeInfoDiv.html(renderedHtml);
    },
    error: function(error) {
      console.error('Error fetching or parsing JSON:', error);
    }
  });
}
fetchPlaneData();
