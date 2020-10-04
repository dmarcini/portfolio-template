$(document).ready(function() {
  loadEducationContainers();
  loadExperienceContainers();
});

function loadEducationContainers() {
  $(".education").each(function() {
    const period = $(this).data("period");
    const position = $(this).data("position");
    const description = $(this).text();

    const educationContainer = getContainer("#education-container", period,
                                            position, description);

    $(this).replaceWith(educationContainer);    
  });
}

function loadExperienceContainers() {
  $(".experience").each(function() {
    const period = $(this).data("period");
    const position = $(this).data("position");
    const description = $(this).text();

    const experienceContainer = getContainer("#experience-container", period,
                                             position, description);

    $(this).replaceWith(experienceContainer); 
  });
}

function getContainer(id, period, position, description) {
  const containerClone = $(id).clone();

  containerClone.removeAttr("hidden id");

  const periodContainer = containerClone.find(".period").first();
  const positionContainer = containerClone.find(".position").first();
  const descriptionContainer = containerClone.find(".description").first();

  periodContainer.text(period);
  positionContainer.text(position);
  descriptionContainer.text(description);

  return containerClone;
}
