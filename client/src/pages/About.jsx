export default function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-800">
        <div>
          <h1 className="text-4xl font-bold text-center my-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            About Vinod Chandra
          </h1>
          <div className="text-md flex flex-col gap-8">
            <p className="transition duration-300 ease-in-out transform hover:scale-105">
              Hello! I'm <strong>Vinod Chandra</strong>, a passionate{" "}
              <strong>Frontend Developer</strong> with over 3 years of
              experience working in top product-based companies. I specialize
              in building high-performance web applications using technologies
              like <strong>HTML5</strong>, <strong>CSS3</strong>,{" "}
              <strong>JavaScript</strong>, and <strong>React</strong>.
            </p>

            <p className="transition duration-300 ease-in-out transform hover:scale-105">
              Throughout my career, I've developed and maintained dynamic web
              applications, collaborated with design teams, and worked on
              enhancing performance for better user experience. I'm also
              familiar with backend technologies like <strong>Node.js</strong>,{" "}
              <strong>Express.js</strong>, and <strong>MongoDB</strong>,
              allowing me to contribute across the full stack.
            </p>

            <p className="transition duration-300 ease-in-out transform hover:scale-105">
              In addition to my professional experience, I’ve worked on personal
              projects, such as building a comprehensive legal discovery
              platform called <strong>eDiscovery</strong>, and I’ve developed my
              own professional portfolio to showcase my skills and projects. You
              can explore my work further on my{" "}
              <a
                href="https://mymernportfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                portfolio website
              </a>
              .
            </p>

            <p className="transition duration-300 ease-in-out transform hover:scale-105">
              I'm always eager to learn and stay updated with the latest web
              development trends. You can find more about my work on my{" "}
              <a
                href="https://github.com/Vinod3d"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                GitHub
              </a>{" "}
              or connect with me on{" "}
              <a
                href="https://linkedin.com/in/vinod-chandra-2a818019a"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                LinkedIn
              </a>.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="https://linkedin.com/in/vinod-chandra-2a818019a"
              target="_blank"
                rel="noreferrer"
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
