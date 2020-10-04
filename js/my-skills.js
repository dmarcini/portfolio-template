$(document).ready(function() {
  loadSkillContainers();
});

function loadSkillContainers() {
  $(".skill-container").each(function() {
    const skillLevel = $(this).data("skillLevel");
    const skillDescription = $(this).text();

    const skillContainer = $("#skill-container-template").clone();

    skillContainer.removeAttr("hidden id");

    const skillHeader = skillContainer.children().first()
                                      .children().last();
    const skillCircleContainer = skillContainer.children().last()
                                               .children().first();

    skillHeader.text(skillDescription);
    skillCircleContainer.data("skillLevel", skillLevel);

    loadSkillCircleContainer(skillCircleContainer);

    $(this).replaceWith(skillContainer);
  });
}

function loadSkillCircleContainer(skillCircleContainer) {
  const skillCircleNumber = 
    $("#skill-circle-container-template").children().length - 1;

  const skillLevel = getSkillLevel(skillCircleContainer, skillCircleNumber);
  const newSkillCircleContainer = getSkillCircleContainer(skillLevel,
                                                          skillCircleNumber);
  const skilllLevelDescription =  getSkillLevelDescription(skillLevel);

  newSkillCircleContainer.children()
                         .last()
                         .text(skilllLevelDescription);

  skillCircleContainer.replaceWith(newSkillCircleContainer);
}

function getSkillLevel(skillCircleContainer, skillCircleNumber) {
  let skillLevel = skillCircleContainer.data("skillLevel");

  skillLevel = skillLevel > skillCircleNumber ? skillCircleNumber
                                              : skillLevel;
  skillLevel = skillLevel < 0 ? 0 : skillLevel; 

  return skillLevel;
}

function getSkillCircleContainer(skillLevel, skillCircleNumber) {
  const skillCircleContainerClone = 
    $("#skill-circle-container-template").clone();

  skillCircleContainerClone.removeAttr("hidden id");

  skillCircleContainerClone.children()
                           .slice(0, skillLevel)
                           .addClass("light-skill-circle");
  skillCircleContainerClone.children()
                           .slice(skillLevel, skillCircleNumber)
                           .addClass("dark-skill-circle");

  return skillCircleContainerClone;
}

function getSkillLevelDescription(skillLevel) {
  const skillLevelDescriptionContainer = 
    $("#skill-level-description-container ul");
  const skillLevelDescription = 
    skillLevelDescriptionContainer.children().eq(skillLevel).text();

  return skillLevelDescription;                    
}
