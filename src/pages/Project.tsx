import { useState, type MouseEvent } from "react";
import { projects, type Project } from "../data/projects";
import { techStackRegistry } from "../data/techStack";

interface ProjectProps {
  onMissingProjectUrl?: () => void;
}

export default function Project({ onMissingProjectUrl }: ProjectProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (projectTitle: string) => {
    setExpanded((prev) => ({
      ...prev,
      [projectTitle]: !prev[projectTitle],
    }));
  };

  const handleProjectLink = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (!project.url) {
      event.preventDefault();
      onMissingProjectUrl?.();
    }
  };

  return (
    <div id="project" className="px-3 mx-auto mt-32 xl:px-32 sm:px-5">
      <h1 className="text-center lg:text-5xl mobile-m:text-4xl text-3xl font-bold tracking-wide lg:py-3 pb-5 sm:pb-4 bg-gradient-to-b from-[#0077C0] via-[#0077C0] to-[#C7EEFF] bg-clip-text text-transparent">
        -- Project --
      </h1>
      <h2 className="mb-5 text-xs italic tracking-wider text-center font-extralight lg:text-base mobile-m:text-sm max-lg:-mt-3">
        Some collection of the <span className="font-semibold">projects</span> I've{" "}
        <span className="font-semibold">made</span>.
      </h2>

      <div className="flex flex-col gap-20 mx-auto mt-5 lg:gap-16">
        {projects.map((project) => {
          const isExpanded = !!expanded[project.title];
          const shouldTruncate = project.description.length > 150;
          const descriptionText = shouldTruncate && !isExpanded
            ? `${project.description.slice(0, 150)}...`
            : project.description;

          return (
            <div key={project.title}>
              <div className="flex items-start justify-between max-lg:flex-col">
                <a
                  href={project.url ?? "#"}
                  className="w-full lg:w-1/3"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => handleProjectLink(event, project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-auto rounded-lg hover:border-2 border-[#0077C0] transition"
                  />
                </a>
                <div className="w-full lg:w-2/3 lg:ml-6">
                  <div className="flex items-center justify-between mb-2 max-lg:mt-3">
                    <a
                      href={project.url ?? "#"}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => handleProjectLink(event, project)}
                    >
                      <h2 className="mr-4 text-lg font-semibold sm:text-2xl lg:mr-6">
                        {project.title}
                      </h2>
                    </a>
                    <h3 className="text-right text-gray-400 sm:text-lg">{project.date}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-[#0077C0] lg:text-sm text-xs font-medium hover:bg-[#005a99] transition duration-200 inline-block">
                    {project.category}
                  </span>
                  <p className="mt-5 text-gray-300" id={`project-description-${project.title}`}>
                    <span className="description-text">{descriptionText}</span>
                    {shouldTruncate && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(project.title)}
                        className="font-semibold text-[#C7EEFF] hover:underline read-more ml-1"
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </p>
                  <div className="flex items-center justify-between mt-5 lg:mt-7">
                    <div className="grid grid-cols-5 mobile-m:grid-cols-6 mobile-l:grid-cols-7 sm:grid-cols-12">
                      {project.techStack.map((stackKey) => {
                        const tech = techStackRegistry[stackKey];

                        return (
                          <div
                            key={`${project.title}-${stackKey}`}
                            className="rounded-full border border-[#C7EEFF] hover:translate-y-1 sm:w-10 sm:h-10 w-8 h-8 hover:bg-[#C7EEFF] transition duration-200 flex justify-center items-center"
                            title={tech.name}
                          >
                            {tech.type === "image" ? (
                              <img
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                alt={tech.name}
                                title={tech.name}
                                src={tech.logo}
                              />
                            ) : (
                              <i className={tech.logo} title={tech.name}></i>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <a
                      href={project.url ?? "#"}
                      className="sm:text-lg text-sm mobile-m:text-base underline hover:no-underline decoration-2 decoration-solid decoration-[#0077C0] underline-offset-8 font-medium text-[#0077C0] hover:border-2 border-[#0077C0] sm:px-4 px-2 py-1 rounded-md hover:text-[#C7EEFF] transition"
                      target={project.url ? "_blank" : undefined}
                      rel={project.url ? "noopener noreferrer" : undefined}
                      onClick={(event) => handleProjectLink(event, project)}
                    >
                      Live preview
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}