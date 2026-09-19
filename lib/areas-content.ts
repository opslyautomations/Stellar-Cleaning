/**
 * Ten location pages, ten hand-written intros and thirty hand-written reasons.
 *
 * Nothing here is generated from a template and no sentence is reused between
 * two cities — that is the whole point of the file. Ten pages that are one
 * template with the city swapped are doorway pages, and they earn nothing.
 *
 * The two layouts alternate to break template detection: Layout A puts the
 * local intro first and renders the reasons as LedgerRows; Layout B leads with
 * the services grid and renders the reasons as a ChecklistSlab.
 */
export type AreaContent = {
  layout: "A" | "B";
  introTitle: string;
  introBody: string[];
  why: { title: string; body: string }[];
  nearby: string[];
};

export const AREA_CONTENT: Record<string, AreaContent> = {
  corvallis: {
    layout: "A",
    introTitle: "Our home base",
    introBody: [
      "Corvallis is where Stellar Cleaning Solutions started, and it is still where most of our crews begin their day. We know the difference between cleaning a downtown storefront on 2nd Street, an office in the Oregon State University corridor, and a rental turnover in South Corvallis — three buildings, three sets of expectations, three different scopes of work.",
      "Being based here means short drive times, same-week walkthroughs, and a crew that is not treating your building as the far end of a route.",
    ],
    why: [
      {
        title: "We are actually local",
        body: "Not a franchise dispatching from two hours away. Our base is here, which is why Corvallis accounts get the fastest scheduling.",
      },
      {
        title: "University-cycle awareness",
        body: "Move-out season around OSU is a completely different workload from July. We staff for it instead of being surprised by it.",
      },
      {
        title: "Mixed-property experience",
        body: "Academic offices, downtown retail, medical suites and residential rentals, all inside the same city, all on our books.",
      },
    ],
    nearby: ["philomath", "albany", "lebanon"],
  },

  albany: {
    layout: "B",
    introTitle: "Cleaning for Albany's business core",
    introBody: [
      "Albany's commercial base runs from the historic Monteith and Hackleman districts through to the industrial corridor along the river, and the cleaning needs shift sharply between them. A restored downtown office in a century-old building has different floor care requirements than a modern manufacturing office, and we scope them separately.",
      "Albany is a fifteen-minute drive from our Corvallis base, which means evening and weekend crews here without a travel surcharge conversation.",
    ],
    why: [
      {
        title: "Historic-building floor care",
        body: "Original hardwood and tile in the downtown districts get surface-appropriate treatment, not a one-size mop.",
      },
      {
        title: "Industrial and office both",
        body: "We handle the manufacturing-adjacent office space that general residential cleaners will not quote.",
      },
      {
        title: "Close enough for after-hours",
        body: "Short transit from Corvallis makes evening service practical rather than premium-priced.",
      },
    ],
    nearby: ["corvallis", "lebanon", "salem"],
  },

  lebanon: {
    layout: "A",
    introTitle: "Serving Lebanon's medical and community facilities",
    introBody: [
      "Lebanon has grown around its healthcare sector, and healthcare-adjacent cleaning carries requirements that ordinary commercial work does not — product restrictions, documented schedules, and areas that are simply off-limits without escort. We are comfortable working inside those constraints, and equally comfortable with the small professional offices and family homes that make up the rest of the town.",
      "Lebanon sits an easy drive from our Corvallis base and gets the same crew consistency as anywhere in the valley.",
    ],
    why: [
      {
        title: "Comfortable with restricted areas",
        body: "Access policies, escort requirements and excluded rooms are written into the contract, not improvised.",
      },
      {
        title: "Documented, repeatable schedules",
        body: "When an inspection asks when a space was last serviced, there is an answer.",
      },
      {
        title: "Small-town responsiveness",
        body: "A direct line to someone who can act, which is the whole point of hiring locally.",
      },
    ],
    nearby: ["albany", "corvallis", "salem"],
  },

  philomath: {
    layout: "B",
    introTitle: "Small-town service, ten minutes from home base",
    introBody: [
      "Philomath is close enough to Corvallis that we can be there for a walkthrough the same day you call, and small enough that word travels — which is most of why we have work here.",
      "The mix skews residential and small commercial: family homes, local businesses along Main Street, and properties on the edge of town heading toward the Coast Range, where mud and wet-season tracking are a real and recurring part of the job.",
    ],
    why: [
      {
        title: "Wet-season realism",
        body: "Entryways, mats and tracked-in mud are treated as a standing part of the scope from October through May, not an exception.",
      },
      {
        title: "Same-day walkthroughs",
        body: "Ten minutes from base means the free estimate visit usually happens within a day or two.",
      },
      {
        title: "Small-business friendly scope",
        body: "We will quote a single-room storefront. Larger outfits often will not.",
      },
    ],
    nearby: ["corvallis", "albany", "eugene"],
  },

  salem: {
    layout: "A",
    introTitle: "Cleaning Oregon's capital city",
    introBody: [
      "Salem's building stock is heavy on government offices, professional services and healthcare, and all three come with the same underlying requirement: cleaning that happens outside business hours and leaves a documented trail. We run evening and weekend crews in Salem for exactly that reason.",
      "The city is also large enough that a cleaning contractor's coverage can quietly thin out at the edges — ours does not, because Salem is scheduled as its own route rather than as an add-on to a Corvallis day.",
    ],
    why: [
      {
        title: "Strictly after-hours capability",
        body: "Offices that cannot host cleaning during the workday are the norm here, and we are staffed for it.",
      },
      {
        title: "Its own route, not an afterthought",
        body: "Salem accounts are scheduled independently, so service does not degrade at the far end of a shift.",
      },
      {
        title: "Professional-services experience",
        body: "Law offices, clinics and agency space, where discretion and access control matter as much as the clean.",
      },
    ],
    nearby: ["albany", "lebanon", "corvallis"],
  },

  eugene: {
    layout: "B",
    introTitle: "Serving Eugene's offices, campuses and homes",
    introBody: [
      "Eugene is the largest market we serve, and the most varied — University of Oregon-adjacent properties, the mixed commercial and creative space around the Whiteaker, downtown offices, and a large residential base with a heavy rental turnover cycle. That variety is the reason we scope every Eugene job individually rather than applying a standard square-footage rate.",
      "It is a longer drive than the mid-valley cities, so Eugene work is grouped into dedicated days, which in practice means more predictable scheduling, not less.",
    ],
    why: [
      {
        title: "Turnover-cycle capacity",
        body: "Rental and student-housing turnover lands in concentrated bursts, and we plan crew capacity around those dates.",
      },
      {
        title: "Dedicated service days",
        body: "Grouped scheduling means your slot is fixed rather than shuffled around mid-valley jobs.",
      },
      {
        title: "Every property type",
        body: "Commercial, residential, janitorial contracts and one-time deep cleans, all from one contractor.",
      },
    ],
    nearby: ["springfield", "philomath", "corvallis"],
  },

  springfield: {
    layout: "A",
    introTitle: "Practical cleaning for Springfield",
    introBody: [
      "Springfield's mix leans industrial, medical and residential, with the PeaceHealth RiverBend corridor and the Gateway commercial area driving a lot of the demand.",
      "It is a working city, and the cleaning work reflects that — break rooms that get genuinely used, floors that take real traffic, and shift patterns that do not fit a nine-to-five cleaning window. We schedule around actual operating hours rather than assuming everyone closes at five.",
    ],
    why: [
      {
        title: "Built for shift work",
        body: "Overnight and early-morning service for facilities that never fully close.",
      },
      {
        title: "High-traffic floor care",
        body: "Surfaces that take real wear get treatment matched to the traffic, on a cycle.",
      },
      {
        title: "Break rooms that actually get used",
        body: "Kitchens and shared spaces in working facilities are scoped properly, not wiped down.",
      },
    ],
    nearby: ["eugene", "corvallis", "philomath"],
  },

  bend: {
    layout: "B",
    introTitle: "Cleaning in Central Oregon's fastest-growing city",
    introBody: [
      "Bend runs on a different rhythm from the valley. Tourism drives a large short-term rental and hospitality sector, the Old Mill District and the growing commercial corridors bring steady office and retail work, and the high-desert climate means fine dust is a constant rather than a seasonal problem.",
      "Turnaround speed matters more here than almost anywhere else we work — a vacation rental between guests does not have a flexible window.",
    ],
    why: [
      {
        title: "Turnaround-driven scheduling",
        body: "Short-term rental changeovers are treated as hard deadlines, because they are.",
      },
      {
        title: "High-desert dust management",
        body: "Fine dust needs a different approach than valley grime, and the product and method selection reflects that.",
      },
      {
        title: "Hospitality-grade standards",
        body: "Guest-facing spaces are cleaned to a standard a paying visitor will judge, not an occupant who has grown used to it.",
      },
    ],
    nearby: ["redmond", "prineville"],
  },

  prineville: {
    layout: "A",
    introTitle: "Serving Prineville's facilities and homes",
    introBody: [
      "Prineville combines a long-standing ranching and small-business community with a large-scale data-center presence that has reshaped the local commercial landscape. That produces an unusual mix: family homes and Main Street businesses on one side, and facility-grade commercial requirements on the other.",
      "We quote both, and we do not pretend the same scope of work covers them. Prineville is served on the Central Oregon route alongside Bend and Redmond.",
    ],
    why: [
      {
        title: "Facility-grade and family-home both",
        body: "Two very different standards, quoted separately and staffed appropriately.",
      },
      {
        title: "Scheduled Central Oregon route",
        body: "Consistent service days rather than whenever a crew happens to be passing through.",
      },
      {
        title: "Straight answers on scope",
        body: "If a job needs a specialist rather than a general cleaning contractor, we will say so.",
      },
    ],
    nearby: ["redmond", "bend"],
  },

  redmond: {
    layout: "B",
    introTitle: "Commercial and residential cleaning in Redmond",
    introBody: [
      "Redmond has grown quickly around its airport and industrial park, which means a lot of newer commercial space, a steady flow of new residential construction, and the post-construction cleanup that comes with both.",
      "Newer buildings are not automatically easier to clean — construction dust settles for months, and modern finishes are less forgiving of the wrong product than older surfaces are. We scope new-build work with that in mind.",
    ],
    why: [
      {
        title: "Post-construction experience",
        body: "Construction dust is a multi-pass job, and we quote it as one rather than discovering it halfway through.",
      },
      {
        title: "Modern-finish knowledge",
        body: "Product selection matched to newer flooring, counters and fixtures, so nothing gets etched or dulled.",
      },
      {
        title: "Central Oregon coverage",
        body: "Grouped with Bend and Prineville for consistent, scheduled service days.",
      },
    ],
    nearby: ["bend", "prineville"],
  },
};
