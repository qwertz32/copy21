$(document).ready(function () {
  function createEventBoxes(data) {
      const container = $('.single-event-box');
      $.ajax({
          url: '/templates/events-boxes/eventbox.hbs',
          method: 'GET',
          dataType: 'text',
          success: function (templateSource) {
              const template = Handlebars.compile(templateSource);
              // console.log('Data:', data);
              data.forEach(event => {
                  // console.log('Processing event:', event);
                  const boxHtml = template(event);
                  container.append(boxHtml);
              });
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.error('Error fetching Handlebars template, error: ', errorThrown);
          }
      });
  }
  $.ajax({
      url: '/src/examples/one-example-event.json?nocache=' + new Date().getTime(),
      dataType: 'json',
      success: function (eventsData) {
          // console.log('AJAX Success. Received events data:', eventsData);
          const eventsArray = eventsData[0];
          // console.log('Extracted events array:', eventsArray);
          createEventBoxes(eventsArray);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.error('Error fetching events, error: ', errorThrown);
      }
  });
});
