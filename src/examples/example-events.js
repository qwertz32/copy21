$.each(o, (function(s, l) {
                        var u = function(e) {
                            return e.airports && Array.isArray(e.airports) ? e.airports.filter((e => e && e.coords)) : []
                        }(l);
                        u.forEach((function(s) {
                            var u, d = s.coords;
                            if (d && -1 === c.indexOf(s.icao)) {
                                var p, m = new Date(l.startTime),
                                    f = new Date(l.endTime),
                                    g = m <= t && t <= f,
                                    h = o.filter((e => e.airports && e.airports.some((e => e && e.icao === s.icao)) && e.endTime && new Date(e.endTime) >= t)),
                                    b = (u = s.icao, o.filter((e => e.airports && Array.isArray(e.airports) && e.airports.some((e => e && e.icao === u)) && e.endTime && new Date(e.endTime) >= t)).length),
                                    v = h && h.some((e => m <= t && t <= f));
                                p = g || v ? r : b > 1 ? a : n;
                                var y = L.marker(d, {
                                    icon: p
                                }).addTo(map);
                                const S = `event_${Math.random().toString(36).substring(2,12)}`;
                                y.eventId = S;
                                var w = o.filter((e => e.airports && e.airports.some((e => e && e.icao === s.icao)) && e.endTime && new Date(e.endTime) >= t));
                                y.on("mouseover", (function() {
                                    var e = `<b>${s.name}, ${s.city} <br>${s.icao}</b><br>`;
                                    w.forEach((o => {
                                        e += `<br><b>${o.name}</b><br><b>${i(o.startTime)}</b> to <b>${i(o.endTime)}</b>`
                                    })), y.bindPopup(e, {
                                        className: "custom-event-popup",
                                        closeButton: !1
                                    }).openPopup()
                                })), y.on("mouseout", (function() {
                                    y.closePopup()
                                })), y.on("click", (function() {
                                    $(".precise-overlay").fadeIn(), $(".precise-overlay-bg").fadeIn()
                                })), $(".precise-close-btn").click((function() {
                                    e()
                                })), $(".precise-overlay-bg").click((function() {
                                    e()
                                })), console.log(`Event pin put on airport: %c${s.icao} with ${S}`, "font-weight: bold;"), c.push(s.icao)
                            } else console.log("No coords found for airport in event.")
                        }))
                    }))
                })).fail((function(e) {
                    console.error("Error fetching JSON:", e)
                }))