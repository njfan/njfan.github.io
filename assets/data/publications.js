/**
 * Publications — Ningjing Fan
 *
 * image: path to teaser image (replace placeholder.svg with your own)
 * video: optional autoplay loop video teaser (takes precedence over image)
 */
window.SITE_CONFIG = {
  authorMe: "Ningjing Fan",
};

window.PUBLICATIONS = [
  {
    title: "Ref-DGS: Reflective Dual Gaussian Splatting",
    authors: ["Ningjing Fan", "Yiqun Wang", "Dong-Ming Yan", "Peter Wonka"],
    marks: { corresponding: [1] },
    venue: "ACM SIGGRAPH 2026",
    year: 2026,
    image: "images/ref-dgs.png",
    description:
      "A reflective dual Gaussian splatting framework for reconstructing glossy surfaces with accurate reflections.",
    links: {
      project: "https://njfan.github.io/Ref-DGS/",
      arxiv: "https://arxiv.org/abs/2603.07664",
      paper: "https://arxiv.org/pdf/2603.07664",
    },
  },
  {
    title:
      "SSR-GS: Separating Specular Reflection in Gaussian Splatting for Glossy Surface Reconstruction",
    authors: ["Ningjing Fan", "Yiqun Wang"],
    marks: { corresponding: [1] },
    venue: "arXiv preprint",
    year: 2026,
    image: "images/ssr-gs.png",
    description:
      "A specular reflection modeling framework for glossy surface reconstruction with 3D Gaussian splatting.",
    links: {
      project: "https://gsflyer.github.io/SSR-GS/",
      arxiv: "https://arxiv.org/abs/2603.05152",
      paper: "https://arxiv.org/pdf/2603.05152",
    },
  },
  {
    title:
      "Factored-NeuS: Reconstructing Surfaces, Illumination, and Materials of Possibly Glossy Objects",
    authors: [
      "Yue Fan",
      "Ningjing Fan",
      "Ivan Skorokhodov",
      "Oleg Voynov",
      "Savva Ignatyev",
      "Evgeny Burnaev",
      "Peter Wonka",
      "Yiqun Wang",
    ],
    marks: { corresponding: [7] },
    venue: "CVPR 2025",
    year: 2025,
    video: "images/factored-neus.mp4",
    description:
      "Factorized neural surface reconstruction that disentangles geometry, illumination, and materials for glossy objects.",
    links: {
      project: "https://yiqun-wang.github.io/Factored-NeuS/",
      arxiv: "https://arxiv.org/abs/2305.17929",
      paper: "https://openaccess.thecvf.com/content/CVPR2025/papers/Fan_Factored-NeuS_Reconstructing_Surfaces_Illumination_and_Materials_of_Possibly_Glossy_Objects_CVPR_2025_paper.pdf",
    },
  },
  {
    title:
      "Security Analysis of Alignment-Robust Cancelable Biometric Scheme for Iris Verification",
    authors: ["Ningjing Fan", "Dongdong Zhao", "Hucheng Liao"],
    marks: { corresponding: [1] },
    venue: "ICICS 2023",
    year: 2023,
    image: "images/icics-2023.svg",
    description:
      "Security analysis of an alignment-robust cancelable biometric scheme for iris verification.",
    links: {
      paper: "https://link.springer.com/chapter/10.1007/978-981-99-7356-9_16",
    },
  },
];
