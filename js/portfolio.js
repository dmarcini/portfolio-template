$(document).ready(function() {
    loadProjectContainers();

    let slideshow = [];

    $(".slideshow-container").each(function() {
        slideshow.push(Slideshow($(this)));
    });

    $(".next").each(function(index) {
        $(this).on("click", () => slideshow[index](1));
    });
    $(".prev").each(function(index) {
        $(this).on("click", () => slideshow[index](-1));
    });
});

const TECHNOLOGIES_SEPARATOR = " ";
const TECHNOLOGY_PART_NAME_SEPARATOR = "~"
const IMAGES_SEPARATOR = " ";
const IMAGE_PARAMS_SEPARATOR = ":"

function loadProjectContainers() {
    $("#projects-list li").each(function() {
        const projectTitle = $(this).data("projectTitle");
        const technologies = $(this).data("technologies");
        const projectUrl = $(this).data("projectUrl");
        const projectImagesUrl = $(this).data("projectImagesUrl");
        const projectImages = $(this).data("projectImages");
        const projectDescription = $(this).text();

        const project = new Project(projectTitle, projectDescription,
                                    projectImagesUrl, projectUrl, technologies, 
                                    projectImages);

        const projectContainer = getProjectContainer(project);

        $(this).html(projectContainer);
    });
}

function getProjectContainer(project) {
    const projectContainerClone = $("#project-container-template").clone();

    projectContainerClone.removeAttr("hidden id");

    const projectTitle = projectContainerClone.find(".project-title").first();
    const projectDescription = projectContainerClone.find(".project-description").first();
    const projectUrl = projectContainerClone.find(".project-url").first();
    const technologyContainer = projectContainerClone.find(".technology-container").first();
    const slideshowContainer = projectContainerClone.find(".slideshow-container").first();

    projectTitle.text(project.title);
    projectDescription.text(project.description);

    projectUrl.attr("href", project.url);

    addTechnologiesToContainer(project.technologies, technologyContainer);
    addImagesToContainer(project.images, slideshowContainer);
    
    return projectContainerClone;
}

function addTechnologiesToContainer(technologies, technologyContainer) {
    technologies.forEach((technology) => {
        technology = technology.replace(TECHNOLOGY_PART_NAME_SEPARATOR, " ");

        technologyContainer.prepend($("<span></span>").addClass("col-sm-12 col-md-4")
                                                      .text(technology));
    });
}

function addImagesToContainer(images, slideshowContainer) {
    let slideContainers = [];

    images.forEach((image, index, images) => {
        const slideContainer = getSlideContainer(image, index, images.length);

        slideContainers.push(slideContainer);
    });

    slideshowContainer.prepend(slideContainers);
}

function getSlideContainer(image, index, imagesNumber) {
    const slideshowContainerClone = $("#slideshow-container-template").clone();

    slideshowContainerClone.removeAttr("id");
    slideshowContainerClone.attr("hidden", index > 0 ? true : false);

    const imageNumber = slideshowContainerClone.find(".image-number").first();
    const img = slideshowContainerClone.find("img").first();
    const title = slideshowContainerClone.find(".title").first();

    imageNumber.text(index + 1 + " / " + imagesNumber);
    img.attr("src", image.url).attr("alt", image.title).attr("hidden");
    title.text(image.title);

    return slideshowContainerClone;
}

function Image(title, url, filename) {
    this.title = title;
    this.url = ((url === undefined || url === "") ? "/static/images/"
                                                  : url + "/") + filename;
}

function Project(title, description, imagesUrl,
                 url, technologies, imagesParams) {
    this.title = title;
    this.description = description;
    this.url = url;
    this.technologies = technologies.split(TECHNOLOGIES_SEPARATOR);
    this.images = [];

    const imagesParamsArray = imagesParams.split(IMAGES_SEPARATOR);

    imagesParamsArray.forEach((imageParams) => {
        const params = imageParams.split(IMAGE_PARAMS_SEPARATOR);

        const title = params[0];
        const filename = params[1];

        const image = new Image(title, imagesUrl, filename);

        this.images.push(image);
    });
}

function Slideshow(slideshowContainer) {
    let index = 0;

    function changeIndex(value) {
        let imagesNumber = slideshowContainer.children().length - 2;

        index += value;

        index = (index < 0) ? imagesNumber - 1 : index;
        index = (index >= imagesNumber) ? 0 : index;
    };

    return function nextSlide(value) {
        changeIndex(value);

        slideshowContainer.children().each(function(currentIndex) {
            if ($(this).is("div")) {
                $(this).attr("hidden", true);
            }   

            if (index === currentIndex) {
                $(this).removeAttr("hidden");
            }
        });
    }
}
