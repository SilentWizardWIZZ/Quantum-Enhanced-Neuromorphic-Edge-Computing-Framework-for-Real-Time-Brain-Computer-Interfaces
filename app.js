// Quantum BCI Framework Interactive Application

// Application state
let demoState = {
  isRunning: false,
  quantumEnabled: false,
  neuromorphicEnabled: false,
  signalType: 'motor',
  metrics: {
    latency: 0,
    accuracy: 0,
    throughput: 0,
    power: 0
  }
};

let signalCanvas, signalContext;
let animationId;
let signalData = [];
let timeOffset = 0;

// DOM elements
let elements = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  initializeCanvas();
  initializeEventListeners();
  initializeArchitecture();
  initializeAccordion();
  startQuantumAnimation();
  initializeNavigation();
});

// Initialize DOM element references
function initializeElements() {
  elements = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Architecture
    layers: document.querySelectorAll('.layer'),
    layerInfo: document.getElementById('layer-info'),
    
    // Demo controls
    signalTypeSelect: document.getElementById('signal-type'),
    quantumToggle: document.getElementById('quantum-toggle'),
    neuroToggle: document.getElementById('neuro-toggle'),
    startSimulation: document.getElementById('start-simulation'),
    
    // Demo visualization
    signalCanvas: document.getElementById('signal-canvas'),
    pipelineStages: document.querySelectorAll('.pipeline-stage'),
    
    // Metrics
    latencyValue: document.getElementById('latency-value'),
    accuracyValue: document.getElementById('accuracy-value'),
    throughputValue: document.getElementById('throughput-value'),
    powerValue: document.getElementById('power-value'),
    
    // Implementation
    stepItems: document.querySelectorAll('.step-item'),
    stepHeaders: document.querySelectorAll('.step-header')
  };
}

// Initialize navigation
function initializeNavigation() {
  // Add smooth scrolling and active states
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      elements.navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Get target section
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Calculate offset for fixed navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - navbarHeight - 20;
        
        // Smooth scroll to section
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const scrollPosition = window.scrollY + navbarHeight + 50;
  
  const sections = ['overview', 'architecture', 'specifications', 'research', 'demo', 'implementation'];
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove active class from all links
        elements.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  });
}

// Initialize canvas for signal visualization
function initializeCanvas() {
  signalCanvas = elements.signalCanvas;
  if (signalCanvas) {
    signalContext = signalCanvas.getContext('2d');
    
    // Set canvas size
    const rect = signalCanvas.getBoundingClientRect();
    signalCanvas.width = 600;
    signalCanvas.height = 200;
    
    // Initialize signal data
    for (let i = 0; i < 600; i++) {
      signalData.push(0);
    }
    
    drawSignalBackground();
  }
}

// Initialize event listeners
function initializeEventListeners() {
  // Demo controls
  if (elements.signalTypeSelect) {
    elements.signalTypeSelect.addEventListener('change', handleSignalTypeChange);
  }
  
  if (elements.quantumToggle) {
    elements.quantumToggle.addEventListener('click', toggleQuantum);
  }
  
  if (elements.neuroToggle) {
    elements.neuroToggle.addEventListener('click', toggleNeuromorphic);
  }
  
  if (elements.startSimulation) {
    elements.startSimulation.addEventListener('click', toggleSimulation);
  }
  
  // Innovation cards hover effect
  const innovationCards = document.querySelectorAll('.innovation-card');
  innovationCards.forEach(card => {
    card.addEventListener('mouseenter', handleInnovationHover);
    card.addEventListener('mouseleave', handleInnovationLeave);
  });
  
  // Application cards hover effect
  const applicationCards = document.querySelectorAll('.application-card');
  applicationCards.forEach(card => {
    card.addEventListener('mouseenter', handleApplicationHover);
    card.addEventListener('mouseleave', handleApplicationLeave);
  });
}

// Smooth scroll function for button clicks
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - navbarHeight - 20;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update active nav link
    elements.navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Architecture section initialization
function initializeArchitecture() {
  elements.layers.forEach(layer => {
    layer.addEventListener('click', handleLayerClick);
  });
}

function handleLayerClick(e) {
  const layer = e.currentTarget;
  const layerType = layer.dataset.layer;
  
  // Remove active class from all layers
  elements.layers.forEach(l => l.classList.remove('active'));
  
  // Add active class to clicked layer
  layer.classList.add('active');
  
  // Update info panel
  updateLayerInfo(layerType);
}

function updateLayerInfo(layerType) {
  const layerData = {
    quantum: {
      title: 'Quantum Processing Unit',
      description: 'Quantum algorithms for pattern recognition in neural signals',
      details: [
        '16-qubit quantum processor with superconducting qubits',
        'Quantum Fourier Transform for frequency analysis',
        'Grover\'s algorithm for pattern matching',
        'Quantum machine learning algorithms',
        'Error correction and noise mitigation'
      ]
    },
    neuromorphic: {
      title: 'Neuromorphic Computing Array',
      description: 'Spiking neural networks for real-time signal processing',
      details: [
        '1 million synthetic neurons with configurable dynamics',
        '256 million plastic synapses with STDP learning',
        '1 microsecond temporal resolution',
        'Event-driven computation paradigm',
        'Ultra-low power consumption (~10mW)'
      ]
    },
    edge: {
      title: 'Edge Computing Cluster',
      description: 'Distributed processing nodes for low-latency responses',
      details: [
        'ARM Cortex-A78 based edge devices',
        'Sub-millisecond response latency',
        '5G connectivity with network slicing',
        'Kubernetes orchestration',
        'Auto-scaling based on workload'
      ]
    },
    bci: {
      title: 'Brain-Computer Interface',
      description: 'High-resolution EEG/ECoG signal acquisition',
      details: [
        '256-channel high-density electrode array',
        '10 kHz sampling rate per channel',
        'Wireless transmission via custom protocol',
        'Real-time artifact rejection',
        'Biocompatible electrode materials'
      ]
    }
  };
  
  const data = layerData[layerType];
  if (data && elements.layerInfo) {
    elements.layerInfo.innerHTML = `
      <h3>${data.title}</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-16);">
        ${data.description}
      </p>
      <h4 style="margin-bottom: var(--space-12); font-size: var(--font-size-md);">
        Technical Specifications:
      </h4>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${data.details.map(detail => `
          <li style="padding: var(--space-4) 0; color: var(--color-text-secondary); position: relative; padding-left: var(--space-16);">
            <span style="position: absolute; left: 0; color: var(--color-primary);">▸</span>
            ${detail}
          </li>
        `).join('')}
      </ul>
    `;
  }
}

// Demo functionality
function handleSignalTypeChange(e) {
  demoState.signalType = e.target.value;
  updateSignalVisualization();
}

function toggleQuantum() {
  demoState.quantumEnabled = !demoState.quantumEnabled;
  elements.quantumToggle.textContent = demoState.quantumEnabled ? 'Disable Quantum' : 'Enable Quantum';
  elements.quantumToggle.classList.toggle('btn--primary', demoState.quantumEnabled);
  elements.quantumToggle.classList.toggle('btn--secondary', !demoState.quantumEnabled);
  
  updateProcessingPipeline();
  updateMetrics();
}

function toggleNeuromorphic() {
  demoState.neuromorphicEnabled = !demoState.neuromorphicEnabled;
  elements.neuroToggle.textContent = demoState.neuromorphicEnabled ? 'Disable SNN' : 'Enable SNN';
  elements.neuroToggle.classList.toggle('btn--primary', demoState.neuromorphicEnabled);
  elements.neuroToggle.classList.toggle('btn--secondary', !demoState.neuromorphicEnabled);
  
  updateProcessingPipeline();
  updateMetrics();
}

function toggleSimulation() {
  demoState.isRunning = !demoState.isRunning;
  
  if (demoState.isRunning) {
    startSimulation();
    elements.startSimulation.textContent = 'Stop Simulation';
    elements.startSimulation.classList.add('btn--outline');
    elements.startSimulation.classList.remove('btn--primary');
  } else {
    stopSimulation();
    elements.startSimulation.textContent = 'Start Simulation';
    elements.startSimulation.classList.remove('btn--outline');
    elements.startSimulation.classList.add('btn--primary');
  }
}

function startSimulation() {
  // Activate all pipeline stages
  elements.pipelineStages.forEach(stage => {
    stage.classList.add('active');
    const status = stage.querySelector('.stage-status');
    if (status) {
      status.textContent = 'Active';
    }
  });
  
  // Start signal animation
  animateSignal();
  
  // Start metrics updates
  startMetricsAnimation();
}

function stopSimulation() {
  // Deactivate pipeline stages
  elements.pipelineStages.forEach((stage, index) => {
    setTimeout(() => {
      stage.classList.remove('active');
      const status = stage.querySelector('.stage-status');
      if (status) {
        status.textContent = index === 0 ? 'Ready' : 'Standby';
      }
    }, index * 200);
  });
  
  // Stop animations
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  // Reset metrics
  resetMetrics();
}

function animateSignal() {
  if (!demoState.isRunning || !signalContext) return;
  
  // Clear canvas
  signalContext.clearRect(0, 0, signalCanvas.width, signalCanvas.height);
  drawSignalBackground();
  
  // Generate new signal data based on type
  const newSample = generateSignalSample();
  signalData.shift();
  signalData.push(newSample);
  
  // Draw signal
  drawSignal();
  
  timeOffset += 0.1;
  animationId = requestAnimationFrame(animateSignal);
}

function generateSignalSample() {
  let sample = 0;
  const t = timeOffset;
  
  switch (demoState.signalType) {
    case 'motor':
      // Motor cortex - mu rhythm with movement artifacts
      sample = Math.sin(t * 0.4) * 30 + Math.sin(t * 0.8) * 15 + Math.random() * 10;
      break;
    case 'visual':
      // Visual cortex - alpha waves with gamma bursts
      sample = Math.sin(t * 0.6) * 25 + Math.sin(t * 2.0) * 8 + Math.random() * 8;
      break;
    case 'auditory':
      // Auditory cortex - beta waves with theta modulation
      sample = Math.sin(t * 0.5) * 20 + Math.sin(t * 1.2) * 12 + Math.random() * 6;
      break;
  }
  
  return sample;
}

function drawSignalBackground() {
  if (!signalContext) return;
  
  // Draw grid
  signalContext.strokeStyle = 'rgba(50, 184, 198, 0.1)';
  signalContext.lineWidth = 1;
  
  // Horizontal lines
  for (let y = 0; y < signalCanvas.height; y += 20) {
    signalContext.beginPath();
    signalContext.moveTo(0, y);
    signalContext.lineTo(signalCanvas.width, y);
    signalContext.stroke();
  }
  
  // Vertical lines
  for (let x = 0; x < signalCanvas.width; x += 50) {
    signalContext.beginPath();
    signalContext.moveTo(x, 0);
    signalContext.lineTo(x, signalCanvas.height);
    signalContext.stroke();
  }
  
  // Center line
  signalContext.strokeStyle = 'rgba(50, 184, 198, 0.3)';
  signalContext.lineWidth = 2;
  signalContext.beginPath();
  signalContext.moveTo(0, signalCanvas.height / 2);
  signalContext.lineTo(signalCanvas.width, signalCanvas.height / 2);
  signalContext.stroke();
}

function drawSignal() {
  if (!signalContext) return;
  
  signalContext.strokeStyle = '#32b8c6';
  signalContext.lineWidth = 2;
  signalContext.beginPath();
  
  for (let i = 0; i < signalData.length; i++) {
    const x = i;
    const y = signalCanvas.height / 2 + signalData[i];
    
    if (i === 0) {
      signalContext.moveTo(x, y);
    } else {
      signalContext.lineTo(x, y);
    }
  }
  
  signalContext.stroke();
  
  // Draw processing indicator
  if (demoState.quantumEnabled || demoState.neuromorphicEnabled) {
    const indicatorX = signalCanvas.width - 50;
    const indicatorY = 30;
    
    if (demoState.quantumEnabled) {
      signalContext.fillStyle = 'rgba(50, 184, 198, 0.3)';
      signalContext.fillRect(indicatorX, indicatorY, 40, 15);
      signalContext.fillStyle = '#32b8c6';
      signalContext.font = '10px var(--font-family-mono)';
      signalContext.fillText('Q-PROC', indicatorX + 2, indicatorY + 11);
    }
    
    if (demoState.neuromorphicEnabled) {
      signalContext.fillStyle = 'rgba(50, 184, 198, 0.2)';
      signalContext.fillRect(indicatorX, indicatorY + 20, 40, 15);
      signalContext.fillStyle = '#32b8c6';
      signalContext.font = '10px var(--font-family-mono)';
      signalContext.fillText('N-PROC', indicatorX + 2, indicatorY + 31);
    }
  }
}

function updateProcessingPipeline() {
  const quantumStage = document.getElementById('stage-quantum');
  const neuroStage = document.getElementById('stage-neuromorphic');
  
  if (quantumStage) {
    const status = quantumStage.querySelector('.stage-status');
    if (demoState.quantumEnabled) {
      quantumStage.style.borderColor = 'var(--color-primary)';
      if (status) status.textContent = 'Ready';
    } else {
      quantumStage.style.borderColor = 'var(--color-border)';
      if (status) status.textContent = 'Disabled';
    }
  }
  
  if (neuroStage) {
    const status = neuroStage.querySelector('.stage-status');
    if (demoState.neuromorphicEnabled) {
      neuroStage.style.borderColor = 'var(--color-primary)';
      if (status) status.textContent = 'Ready';
    } else {
      neuroStage.style.borderColor = 'var(--color-border)';
      if (status) status.textContent = 'Disabled';
    }
  }
}

function startMetricsAnimation() {
  const targetMetrics = calculateTargetMetrics();
  animateMetricsTo(targetMetrics);
}

function calculateTargetMetrics() {
  let baseLatency = 150;
  let baseAccuracy = 75;
  let baseThroughput = 100;
  let basePower = 45;
  
  if (demoState.quantumEnabled) {
    baseLatency *= 0.3; // Quantum speedup
    baseAccuracy += 15; // Better pattern recognition
    basePower += 5; // Quantum processing overhead
  }
  
  if (demoState.neuromorphicEnabled) {
    baseLatency *= 0.6; // Neuromorphic efficiency
    baseAccuracy += 10; // Adaptive processing
    basePower *= 0.4; // Ultra-low power
    baseThroughput *= 1.5; // Parallel processing
  }
  
  return {
    latency: Math.max(Math.round(baseLatency), 50),
    accuracy: Math.min(Math.round(baseAccuracy), 98),
    throughput: Math.round(baseThroughput),
    power: Math.round(basePower)
  };
}

function animateMetricsTo(targetMetrics) {
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  const startMetrics = { ...demoState.metrics };
  
  function updateMetrics() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    
    demoState.metrics.latency = Math.round(
      startMetrics.latency + (targetMetrics.latency - startMetrics.latency) * easeOutCubic
    );
    demoState.metrics.accuracy = Math.round(
      startMetrics.accuracy + (targetMetrics.accuracy - startMetrics.accuracy) * easeOutCubic
    );
    demoState.metrics.throughput = Math.round(
      startMetrics.throughput + (targetMetrics.throughput - startMetrics.throughput) * easeOutCubic
    );
    demoState.metrics.power = Math.round(
      startMetrics.power + (targetMetrics.power - startMetrics.power) * easeOutCubic
    );
    
    updateMetricsDisplay();
    
    if (progress < 1 && demoState.isRunning) {
      requestAnimationFrame(updateMetrics);
    }
  }
  
  updateMetrics();
}

function updateMetrics() {
  const targetMetrics = calculateTargetMetrics();
  animateMetricsTo(targetMetrics);
}

function updateMetricsDisplay() {
  if (elements.latencyValue) {
    elements.latencyValue.textContent = `${demoState.metrics.latency}μs`;
  }
  if (elements.accuracyValue) {
    elements.accuracyValue.textContent = `${demoState.metrics.accuracy}%`;
  }
  if (elements.throughputValue) {
    elements.throughputValue.textContent = `${demoState.metrics.throughput} cmd/s`;
  }
  if (elements.powerValue) {
    elements.powerValue.textContent = `${demoState.metrics.power}W`;
  }
}

function resetMetrics() {
  demoState.metrics = { latency: 0, accuracy: 0, throughput: 0, power: 0 };
  updateMetricsDisplay();
}

function updateSignalVisualization() {
  // Reset signal data for new signal type
  signalData.fill(0);
  timeOffset = 0;
}

// Implementation accordion
function initializeAccordion() {
  elements.stepHeaders.forEach(header => {
    header.addEventListener('click', handleStepClick);
  });
}

function handleStepClick(e) {
  const stepItem = e.currentTarget.parentElement;
  const isOpen = stepItem.classList.contains('open');
  
  // Close all other steps
  elements.stepItems.forEach(item => {
    item.classList.remove('open');
  });
  
  // Toggle current step
  if (!isOpen) {
    stepItem.classList.add('open');
  }
}

// Innovation card interactions
function handleInnovationHover(e) {
  const card = e.currentTarget;
  const innovation = card.dataset.innovation;
  
  // Add subtle glow effect
  card.style.boxShadow = '0 8px 32px rgba(50, 184, 198, 0.2)';
  card.style.borderColor = 'var(--color-primary)';
}

function handleInnovationLeave(e) {
  const card = e.currentTarget;
  card.style.boxShadow = '';
  card.style.borderColor = '';
}

// Application card interactions
function handleApplicationHover(e) {
  const card = e.currentTarget;
  card.style.transform = 'translateY(-6px) scale(1.02)';
  card.style.boxShadow = '0 12px 40px rgba(50, 184, 198, 0.15)';
}

function handleApplicationLeave(e) {
  const card = e.currentTarget;
  card.style.transform = '';
  card.style.boxShadow = '';
}

// Quantum animation for background
function startQuantumAnimation() {
  const particles = document.querySelector('.quantum-particles');
  if (particles) {
    // Create additional quantum effects every few seconds
    setInterval(() => {
      if (!demoState.isRunning) {
        const randomParticle = document.createElement('div');
        randomParticle.style.position = 'absolute';
        randomParticle.style.width = Math.random() * 4 + 2 + 'px';
        randomParticle.style.height = randomParticle.style.width;
        randomParticle.style.background = `rgba(50, 184, 198, ${Math.random() * 0.5 + 0.5})`;
        randomParticle.style.borderRadius = '50%';
        randomParticle.style.left = Math.random() * 100 + '%';
        randomParticle.style.top = Math.random() * 100 + '%';
        randomParticle.style.animation = `quantumPulse ${Math.random() * 3 + 1}s ease-out forwards`;
        randomParticle.style.pointerEvents = 'none';
        
        particles.appendChild(randomParticle);
        
        setTimeout(() => {
          if (randomParticle.parentNode) {
            randomParticle.parentNode.removeChild(randomParticle);
          }
        }, 4000);
      }
    }, 2000);
  }
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Window resize handler
window.addEventListener('resize', function() {
  if (signalCanvas) {
    // Reinitialize canvas on resize
    setTimeout(initializeCanvas, 100);
  }
});

// Performance optimization: Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  sectionObserver.observe(section);
});

// Initialize demo with some default values
setTimeout(() => {
  if (elements.signalTypeSelect) {
    demoState.signalType = elements.signalTypeSelect.value;
  }
  updateMetrics();
  updateProcessingPipeline();
  
  // Set first nav link as active initially
  if (elements.navLinks.length > 0) {
    elements.navLinks[0].classList.add('active');
  }
}, 100);