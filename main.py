import pyglet
from pyglet.gl import *

# Window dimensions
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

# Set up the OpenGL context
gl.glClearColor(0.5, 0.69, 1.0, 1.0)
glEnable(gl.GL_DEPTH_TEST)

# Load texture image
texture_image = pyglet.image.load('grass.png').get_texture()

# Define the vertices and texture coordinates for a cube
vertices = [
    -1, -1, -1, 0, 0, 0, 1, 0,  # bottom-left-back
    1, -1, -1, 1, 0, 0, 1, 1,   # bottom-right-back
    1, 1, -1, 1, 1, 0, 1, 1,    # top-right-back
    -1, 1, -1, 0, 1, 0, 1, 0,   # top-left-back
    -1, -1, 1, 0, 0, 1, 0, 0,   # bottom-left-front
    1, -1, 1, 1, 0, 1, 1, 0,    # bottom-right-front
    1, 1, 1, 1, 1, 1, 1, 1,     # top-right-front
    -1, 1, 1, 0, 1, 1, 0, 1     # top-left-front
]

# Define the vertex indices for each face of the cube
indices = [
    0, 1, 2, 3,  # back face
    3, 2, 6, 7,  # top face
    7, 6, 5, 4,  # front face
    4, 5, 1, 0,  # bottom face
    1, 5, 6, 2,  # right face
    4, 0, 3, 7   # left face
]

# Create vertex buffer objects (VBOs) for vertices and indices
vbo = pyglet.graphics.vertexdomain.BufferObject()
vbo.set_data(vertices)

ibo = pyglet.graphics.vertexdomain.IndexBufferObject()
ibo.set_data(indices)

# Create a vertex list for rendering
vlist = pyglet.graphics.vertex_list_indexed(
    len(vertices) // 8,
    ibo,
    ('v3f/static', vbo),
    ('t2f/static', vbo[3:])
)

@window.event
def on_draw():
    window.clear()

    gl.glLoadIdentity()
    gl.glTranslatef(0, 0, -5)  # Move the camera back

    # Enable texture mapping
    gl.glEnable(gl.GL_TEXTURE_2D)
    gl.glBindTexture(gl.GL_TEXTURE_2D, texture_image.id)

    # Draw the cube
    vlist.draw(gl.GL_QUADS)

pyglet.app.run()
