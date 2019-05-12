import {observable} from "mobx";

const categories = [
  "Bounty Hunting",
  "Engineering",
  "Exploration",
  "Freelancing",
  "Infiltration",
  "Piracy",
  "Resources",
  "Scouting",
  "Security",
  "Smuggling",
  "Social",
  "Trading",
  "Transport",
  "Other"
  ];

const dummyMissions = [
  {
    id: "1",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }, { id: 5, username: "Zaden Pax" }],
    attended: [{ id: 3, username: "Coff" }, { id: 5, username: "Zaden Pax" }]
  },
  {
    id: "2",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "3",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "4",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "5",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "6",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "7",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "8",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "9",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "10",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "11",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "12",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "13",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "14",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  },
  {
    id: "15",
    name: "Stanton System exploration",
    description: "We are going to explore around Stanton system for fun.",
    discordURL: "https://discord.gg/9Xfmuw",
    videoURL: "",
    category: "Exploration",
    location: "Port Olisar",
    feature_image: "https://daszojo4xmsc6.cloudfront.net/media/event_images/beresheet2520moon2520landing_image_20190408132015.jpg",
    date: "2019-04-11T19:00:00Z",
    status: "Active",
    briefing: "",
    debriefing: "",
    commander: { id: 1, username: "Rommel" },
    rsvpUsers: [{ id: 2, username: "Axor" }, { id: 3, username: "Coff" }, { id: 4, username: "Tar Garyen" }],
    attended: [{ id: 3, username: "Coff" }]
  }
];

class MissionsStore {

  /* Observable Properties. */

  @observable missions = [];

  /* Constructor. */

  constructor() {
    this.missions = dummyMissions;
  }

  /* Actions. */

  /* Computed Properties. */

  /* Helpers. */

}

const missionsStore = new MissionsStore();
