$(document).ready(function () {
    $.ajax({
      url: 'https://phoenix-api.vatsim.net/api/events',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log('Fetched data:', data);
        renderCategorizedEvents(data);
      },
      error: function (error) {
        console.error('Error fetching JSON:', error);
      }
    });
  });

  function renderCategorizedEvents(events) {
    // Group events by start date
    var categorizedEvents = groupEventsByDate(events);

    // Render events for each category
    for (var category in categorizedEvents) {
      // Create a section for each category
      var $section = $('<div class="event-section"></div>');
      $section.append(`<h2>${category}</h2>`);

      // Render events in the section
      renderEvents(categorizedEvents[category], $section);

      // Append the section to the event-sidebox
      $section.appendTo('.event-sidebox');
    }
  }

  function groupEventsByDate(events) {
    var groupedEvents = {};

    events.forEach(function (event) {
      var startDate = new Date(event.startTime);
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      var category = '';

      if (startDate.toDateString() === today.toDateString()) {
        category = 'Today';
      } else if (startDate.getDate() === today.getDate() + 1) {
        category = 'Tomorrow';
      } else {
        category = startDate.toDateString();
      }

      if (!groupedEvents[category]) {
        groupedEvents[category] = [];
      }

      groupedEvents[category].push(event);
    });

    return groupedEvents;
  }

  function renderEvents(events, $container) {
    var templateScript = $('#event-template').html();
    var template = Handlebars.compile(templateScript);

    events.forEach(function (event) {
      event.shortDescription = event.shortDescription.replace(/<[^>]*>/g, '');
      var html = template(event);

      // Ensure $container is defined before appending
      if ($container) {
        $container.append(html);
      } else {
        console.error('Container is undefined');
      }
    });
  }