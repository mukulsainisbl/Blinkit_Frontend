import { FaLinkedin, FaGithub } from "react-icons/fa6";

const Footer = () => {

  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 pt-5 py-2 bg-white text-center flex flex-col lg:flex-row lg:justify-between gap-2 ">
        <p>©️ All Right Reserved 2024</p>
        <div className="flex items-center gap-4 justify-center">
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mukul-saini-sambhal/" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl">
            <FaLinkedin />
          </a>

          {/* GitHub */}
          <a href="https://github.com/mukulsainisbl" target="_blank" rel="noopener noreferrer" className="text-black text-2xl">
            <FaGithub />
          </a>

          {/* Resume Button (Local File) */}
          <a
            href=  "/Mukulsaini.pdf" // Local path
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
