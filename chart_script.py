import plotly.graph_objects as go
import json

# Data from the provided JSON
data = {
  "projects": [
    {
      "name": "Quantum-Neuromorphic BCI Framework",
      "scores": [10, 10, 10, 10, 10, 9, 10, 10]
    },
    {
      "name": "Typical AI/ML Projects",
      "scores": [6, 5, 6, 6, 4, 7, 5, 6]
    },
    {
      "name": "Basic Web Apps (To-Do, Weather)",
      "scores": [3, 2, 4, 4, 2, 5, 3, 3]
    },
    {
      "name": "Standard Database Projects",
      "scores": [4, 3, 5, 5, 3, 6, 4, 4]
    }
  ],
  "dimensions": [
    "Technical Complexity",
    "Innovation Level", 
    "Real-world Impact",
    "Technology Stack Diversity",
    "Research Contribution",
    "Industry Relevance",
    "Career Differentiation",
    "Academic Recognition"
  ]
}

# Abbreviate dimensions to meet 15 character limit
abbreviated_dimensions = [
    "Tech Complex",
    "Innovation", 
    "Real Impact",
    "Tech Diversity",
    "Research",
    "Industry Relev",
    "Career Differ",
    "Academic Recog"
]

# Abbreviate project names to meet 15 character limit
abbreviated_names = [
    "Quantum BCI",
    "AI/ML Projects",
    "Basic Web Apps",
    "Database Proj"
]

# Brand colors in order
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F']

# Create radar chart
fig = go.Figure()

for i, project in enumerate(data["projects"]):
    # Close the radar chart by adding the first value at the end
    scores = project["scores"] + [project["scores"][0]]
    dimensions = abbreviated_dimensions + [abbreviated_dimensions[0]]
    
    fig.add_trace(go.Scatterpolar(
        r=scores,
        theta=dimensions,
        fill='toself',
        name=abbreviated_names[i],
        line_color=colors[i],
        fillcolor=colors[i],
        opacity=0.3,
        line=dict(width=2)
    ))

fig.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 10],
            tickvals=[0, 2, 4, 6, 8, 10],
            ticktext=['0', '2', '4', '6', '8', '10']
        )
    ),
    title="Project Complexity & Innovation Comparison",
    legend=dict(
        orientation='h', 
        yanchor='bottom', 
        y=1.05, 
        xanchor='center', 
        x=0.5
    )
)

fig.write_image("radar_chart.png")