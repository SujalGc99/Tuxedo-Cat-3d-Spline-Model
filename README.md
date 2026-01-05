# 🐈 Tuxedo Cat 3D Spline Model

An ultra-realistic, stylized 3D Tuxedo cat visualized in the browser using [Three.js](https://threejs.org/) and procedural [Catmull-Rom splines](https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3).

![Tuxedo Cat Visualization](https://via.placeholder.com/800x400?text=Tuxedo+Cat+3D+Demo)

## ✨ Features

- **Procedural Geometry**: The entire cat (body, head, limbs, tail) is generated mathematically using spline curves. No external `.obj` or `.gltf` files!
- **Tuxedo Style**: Custom material system defining the classic black-and-white Tuxedo coat pattern.
- **Realistic Materials**: 'Velvet' fur shader with anisotropy, glowing yellow eyes, and subsurface scattering simulation.
- **Interactive Controls**:
  - 🔄 **360° Orbit**: Inspect the model from any angle.
  - 💡 **Lighting**: Adjust scene intensity in real-time.
  - 🏃 **Animations**: Switch between Idle (breathing), Sitting, and Standing poses.
  - 🎨 **Customization**: Tweak the coat color interactively.
- **Premium UI**: 
  - Full-screen immersive visualization.
  - Glassmorphism control panel (floating & collapsible).
  - Responsive design for mobile and desktop.

## 🚀 Live Demo

[Click here to view the live demo](#) *(Add deployed link here)*

## 🛠️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/SujalGc99/Tuxedo-Cat-3d-Spline-Model.git
   cd Tuxedo-Cat-3d-Spline-Model
   ```

2. **Run Locally**
   Since this project uses ES Modules, you need a local server.
   
   *Using Python:*
   ```bash
   python -m http.server 8000
   ```
   
   *Using Node/NPM:*
   ```bash
   npx serve .
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8000`

## 🎮 How to Interact

| Control | Action |
| :--- | :--- |
| **Left Click + Drag** | Rotate the camera around the cat |
| **Right Click + Drag** | Pan the camera |
| **Scroll** | Zoom in / out |
| **Control Panel** | Use the floating menu on the right to change pose, lighting, and wireframe mode |

## 📦 Deployment (Vercel)

This project is configured for one-click deployment on Vercel.

1. Install Vercel CLI: `npm i -g vercel`
2. Run deploy command: `vercel`

*Alternatively, connect your GitHub repository to Vercel and it will auto-detect the static site.*

## 🧩 Technologies Used

- **Three.js**: Core 3D rendering engine.
- **Vanilla JavaScript (ES6+)**: Logic and class structure.
- **CSS3 / HTML5**: Modern UI with CSS Variables and Flexbox/Grid.
- **Vercel**: Deployment configuration.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
