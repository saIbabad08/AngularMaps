# AngularMaps

## Aim to develop an Angular (v10+) based application that:
- Is map-centric over Google Maps (get a free API key here),
- Renders random geo-points (markers), on the map, inside a predefined geographic bounding box,
- The app provides a toolbox, allowing the user to draw the bounding box
- Once the bounding box is drawn, the application renders a large volume of location points (pins),
- The number of pins is random, between 9K - 15K
- Each pin is clickable. Once clicked, an info window pops-up with the coordinates, and the timestamp the marker was generated.
- Upon rendering completion, a dialog presents the following statistics
    - Number of pins
    - Elapsed time (start - end) of total rendering time
    - Total object (pin) memory allocation