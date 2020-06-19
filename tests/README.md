# Testing
##### Mapbox
Unfortunately Mapbox have not yet provided a solution for testing mapbox-gl.js. Due to the WebGL nature of mapbox-gl, it makes it notoriously difficult to unit test. As such we do not unit test any components that directly interact with the `map` instance.