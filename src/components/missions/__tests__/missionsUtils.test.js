import React from 'react';
import { mount } from 'enzyme';
import MissionsUtils from '../missionsUtils';
import {dummyMissions} from "./dummyMissions";

let mission0;
let mission1;

beforeEach(() => {
  mission0 = dummyMissions[0];
  mission1 = dummyMissions[1];
});

it('can render a loader', () => {
  const wrapped = mount(MissionsUtils.renderLoader()).render().text();
  expect(wrapped).toContain("Loading Missions");
});

it("can get active_mission status", () => {
  const active_color = MissionsUtils.getColorStatus('ACT');
  const successful_color = MissionsUtils.getColorStatus('SUC');
  const failed_color = MissionsUtils.getColorStatus('FAI');
  const default_color = MissionsUtils.getColorStatus("xxx");
  expect(active_color).toEqual("yellow");
  expect(successful_color).toEqual("green");
  expect(failed_color).toEqual("red");
  expect(default_color).toEqual("red");
});

it("can get image URL", () => {
  const actualImageURLForFeature = MissionsUtils.getImageURL(mission1);
  expect(actualImageURLForFeature).toEqual("https://i.redd.it/c0bossg1slw21.png");

  const actualImageURLForNonFeature = MissionsUtils.getImageURL(mission0);
  expect(actualImageURLForNonFeature).toEqual("/images/missions/otherq_category.png");
});

it("can render a mission header", () => {
  const missionHeader = MissionsUtils.renderMissionHeader(mission0);
  const wrapped = mount(missionHeader).get(0);
  expect(mount(wrapped).render().text()).toContain("Messing around in Yela");
});

it("can render a mission description", () => {
  const missionDescription = MissionsUtils.renderMissionDescription(mission0);
  const wrapped = mount(missionDescription).get(1);
  expect(mount(wrapped).render().text()).toContain("We are just going to go to Yela and fuck shit up.");
});

it("can render a mission briefing", () => {
  const missionBriefing = MissionsUtils.renderMissionBriefing(mission0);
  const wrapped = mount(missionBriefing).get(1);
  expect(mount(wrapped).render().text()).toContain("This is a briefing.");
});

it("can render a mission debriefing", () => {
  const missionDebriefing = MissionsUtils.renderMissionDebriefing(mission0);
  const wrapped = mount(missionDebriefing).get(1);
  expect(mount(wrapped).render().text()).toContain("This is debrief.");
});

it("can render mission participants", () => {
  const missionParticipants = MissionsUtils.renderMissionParticipants(mission0);
  const rsvps = mount(missionParticipants).get(1);
  const attendees = mount(missionParticipants).get(3);
  expect(mount(rsvps).render().text()).toContain("3786b93a-30ea-447a-a2b7-3bdb187ead6d");
  expect(mount(attendees).render().text()).toContain("3786b93a-30ea-447a-a2b7-3bdb187ead6d");
});

it("can render users", () => {
  const users = mission0.rsvp_users;
  const userRender = MissionsUtils.renderUser(users);
  expect(userRender.length).toEqual(3);
});

it("can render media items", () => {
  const mediaItems = mount(MissionsUtils.renderMediaItems(mission0));
  expect(mediaItems.length).toEqual(2);
});

it("can render RSVP button", () => {
  const rsvpButton = mount(MissionsUtils.renderRSVPButton());
  expect(rsvpButton.text()).toContain("RSVP");
});
