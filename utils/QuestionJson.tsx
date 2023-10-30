export const questions : any = [
  {
    question: "جنسیت شما چیست؟ ",
    answer: { value_fa: ["مرد", "زن"], value_en: ["Male", "Female"] },
    question_value: "sex",
    type: "radio",
    options: [
      { "value": "Male", "label": "مرد" },
      { "value": "Female", "label": "زن" }
    ]
  },
  {
    question: "کدام کشور را برای انگشت‌نگاری انتخاب می‌کنید؟",
    answer: { value_fa: ["ترکیه", "ارمنستان", "گرجستان", "امارات", "سایر"], value_en: ["TURKEY", "ARMENIA", "GEORGIA", "UAE", "OTHER"] },
    question_value: "country_where_applying_country",
    type: "dropdown",
    options: [
      { "value": "TURKEY", "label": "ترکیه" },
      { "value": "ARMENIA", "label": "ارمنستان" },
      { "value": "GEORGIA", "label": "گرجستان" },
      { "value": "UAE", "label": "امارات" },
      { "value": "OTHER", "label": "سایر" }
    ]
  },
  {
    question: "وضعیت اقامت شما در کشور مدنظرتان برای انگشت‌نگاری چگونه است؟",
    answer: { value_fa: ["ملاقات کننده", "شهروند/اقامت دائم", "سایر"], value_en: ["visitor", "citizen", "OTHER"] },
    question_value: "country_where_applying_status",
    type: "dropdown",
    options: [
      { "value": "visitor", "label": "ملاقات کننده" },
      { "value": "citizen", "label": "شهروند/اقامت دائم" },
      { "value": "OTHER", "label": "سایر" }
    ]
  },
  {
    question: "آیا تا به حال ازدواج کرده‌اید؟",
    answer: { value_fa: ["بله", "خیر"], value_en: ["true", "false"] },
    question_value: "previous_marriage_indicator",
    type: "radio",
    options: [
      { "value": "true", "label": "بله" },
      { "value": "false", "label": "خیر" }
    ]
  },
  {
    question: "هدف شما برای اخذ ویزا چیست؟ ",
    answer: {
      value_fa: ["ملاقات خانواده درجه یک", "ملاقات با سایر اقوام و دوستان", "توریستم", "سایر"],
      value_en: ["family visit", "visit", "tourism", "other"],
    },
    question_value: "purpose_of_visit",
    type: "dropdown",
    options: [
      { "value": "family visit", "label": "ملاقات خانواده درجه یک" },
      { "value": "visit", "label": "ملاقات با سایر اقوام و دوستان" },
      { "value": "tourism", "label": "توریستم" },
      { "value": "other", "label": "سایر" }
    ]
  },
  {
    question: "بودجه سفر (مقدار پول همراه برای سفر) شما چقدر است؟ (دلار 4000 - 8000)",
    answer: { value_fa: [4000, 8000] },
    question_value: "funds",
    type: "number",
    options: [
      { "value": 4000, "label": 4000 },
      { "value": 8000, "label": 8000 }
    ]
  },
  {
    question: "?نوع ارتباط شما با شخص یا سازمانی که بابت آن به سفر می‌روید ",
    answer: { value_fa: ["اقوام درجه یک", "اقوام درجه دو", "دوستان", "هتل", "سایر"], value_en: ["f1", "f2", "friend", "hotel", "ukn"] },
    question_value: "contact_relation_to_me",
    type: "dropdown",
    options: [
      { "value": "f1", "label": "اقوام درجه یک" },
      { "value": "f2", "label": "اقوام درجه دو" },
      { "value": "friend", "label": "دوستان" },
      { "value": "hotel", "label": "هتل" },
      { "value": "ukn", "label": "سایر" }
    ]
  },
  // {
  //   question: "نوع ارتباط شما با شخص یا سازمانی که بابت آن به سفر می‌روید. (اگر دو هدف هستند) (اگر دو هدف هست)؟",
  //   answer: { value_fa: ["اقوام درجه یک", "اقوام درجه دو", "دوستان", "هتل", "سایر"], value_en: ["f1", "f2", "friend", "hotel", "ukn"] },
  //   question_value: "contact_relation_to_me2",
  //   type: "dropdown",
  //   options: [
  //     { "value": "f1", "label": "اقوام درجه یک" },
  //     { "value": "f2", "label": "اقوام درجه دو" },
  //     { "value": "friend", "label": "دوستان" },
  //     { "value": "hotel", "label": "هتل" },
  //     { "value": "ukn", "label": "سایر" }
  //   ]
  // },
  {
    question: "سطح تحصیلات شما چه‌قدر است؟ ",
    answer: {
      value_fa: ["بدون تحصیلات", "کارورزی", "دیپلم", "کارشناسی", "ارشد", "دکترا"],
      value_en: ["unedu", "apprentice", "diploma", "bachelor", "master", "phd"],
    },
    question_value: "education_field_of_study",
    type: "dropdown",
    options: [
      { "value": "unedu", "label": "بدون تحصیلات" },
      { "value": "apprentice", "label": "کارورزی" },
      { "value": "diploma", "label": "دیپلم" },
      { "value": "bachelor", "label": "کارشناسی" },
      { "value": "master", "label": "ارشد" },
      { "value": "phd", "label": "دکترا" }
    ]
  },
  {
    question: "شغل شما چیست؟ ",
    answer: {
      value_fa: ["سایر/بدون شغل", "دانش اموز/دانشجو", "بازنشسته", "کارمند", "متخصص", "مدیر"],
      value_en: ["OTHER", "student", "retired", "employee", "specialist", "manager"],
    },
    question_value: "occupation_title1",
    type: "dropdown",
    options: [
      { "value": "OTHER", "label": "سایر/بدون شغل" },
      { "value": "student", "label": "دانش اموز/دانشجو" },
      { "value": "retired", "label": "بازنشسته" },
      { "value": "employee", "label": "کارمند" },
      { "value": "specialist", "label": "متخصص" },
      { "value": "manager", "label": "مدیر" }
    ]
  },
  {
    question: "آیا تا به حال بیشتر از زمان قانونی در کشوری اقامت داشته اید؟",
    answer: { value_fa: ["بله", "خیر"], value_en: ["true", "false"] },
    question_value: "no_authorized_stay",
    type: "radio",
    options: [
      { "value": "true", "label": "بله" },
      { "value": "false", "label": "خیر" }
    ]
  },
  {
    question: "آیا تا به حال از ورود به کشوری منع یا از کشوری دیپورت شده‌اید؟",
    answer: { value_fa: ["بله", "خیر"], value_en: ["true", "false"] },
    question_value: "refused_entry_or_deport",
    type: "radio",
    options: [
      { "value": "true", "label": "بله" },
      { "value": "false", "label": "خیر" }
    ]
  },
  {
    question: "آیا تا به‌حال برای اخذ ویزا اقدام کرده‌اید؟ ",
    answer: { value_fa: ["بله", "خیر"], value_en: ["true", "false"] },
    question_value: "previous_apply",
    type: "radio",
    options: [
      { "value": "true", "label": "بله" },
      { "value": "false", "label": "خیر" }
    ]
  },
  {
    question: "چند سال‌تان است؟",
    answer: { value_fa: [18, 100] },
    question_value: "date_of_birth",
    type: "number",
    options: [
      { "value": 18, "label": 18 },
      { "value": 100, "label": 100 }
    ]
  },
  {
    question: "در کشور مدنظرتان برای انگشت‌نگاری، چه‌قدر اقامت می‌کنید؟  (روز)",
    answer: { value_fa: [0, 30] },
    question_value: "country_where_applying_period",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 30, "label": 30 }
    ]
  },
  {
    question: " ؟وضعیت تاهل خود را مشخص کنید",
    answer: { value_fa: ["مجرد", "مزدوج", "مطلقه", "بیوه", "سایر"], value_en: ["single", "married", "divorced", "widowed", "unknown"] },
    question_value: "applicant_marital_status",
    type: "dropdown",
    options: [
      { "value": "single", "label": "مجرد" },
      { "value": "married", "label": "مزدوج" },
      { "value": "divorced", "label": "مطلقه" },
      { "value": "widowed", "label": "بیوه" },
      { "value": "unknown", "label": "سایر" }
    ]
  },
  {
    question: "درحال‌حاضر چه مدت زمانی را متاهل هستید؟ (اگر مجرد هستید, پاسخ ندهید)",
    answer: { value_fa: [0, 50] },
    question_value: "marriage_period",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 50, "label": 50 }
    ]
  },
  {
    question: "چه مدت زمانی را در رابطه قبلی‌تان متاهل بوده‌اید؟  (اگر مجرد هستید, پاسخ ندهید)",
    answer: { value_fa: [0, 50] },
    question_value: "previous_marriage_period",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 50, "label": 50 }
    ]
  },
  {
    question: "درحال‌حاضر پاسپورت شما چه‌قدر اعتبار دارد؟ (1 - 5 ) سال",
    answer: { value_fa: [1, 5] },
    question_value: "passport_expiry_date_remaining",
    type: "number",
    options: [
      { "value": 1, "label": 1 },
      { "value": 5, "label": 5 }
    ]
  },
  {
    question: "چه مدت در کشور مقصد اقامت می‌کنید؟ ",
    answer: { value_fa: [1, 30] },
    question_value: "how_long_stay_period",
    type: "number",
    options: [
      { "value": 1, "label": 1 },
      { "value": 30, "label": 30 }
    ]
  },
  {
    question: "برای دریافت آخرین مدرک تحصیلی‌تان چند سال تحصیل کرده‌اید؟ ",
    answer: { value_fa: [0, 10] },
    question_value: "education_period",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 10, "label": 10 }
    ]
  },
  {
    question: "چند سال در آخرین شغل‌تان، مشغول  به کار بوده‌اید؟",
    answer: { value_fa: [0, 70] },
    question_value: "occupation_period",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 70, "label": 70 }
    ]
  },
  {
    question: "قبلا در چند کشور سکونت داشته‌اید؟ ",
    answer: { value_fa: [0, 90] },
    question_value: "previous_country_of_residence_count",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 90, "label": 90 }
    ]
  },
  {
    question: "چند نفر از خواهران و برادران شما در کشورهای خارجی زندگی می‌کنند؟",
    answer: { value_fa: [0, 7] },
    question_value: "sibling_foreigner_count",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 7, "label": 7 }
    ]
  },
  {
    question: "به جز خواهر و برادر، چند نفر از اعضای درجه یک شما در خارج از کشور زندگی می‌کنند؟",
    answer: { value_fa: [0, 7] },
    question_value: "child_mother_father_spouse_foreigner_count",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 7, "label": 7 }
    ]
  },
  {
    question: "چند نفر از فرزندان‌تان با شما سفر می‌کنند؟",
    answer: { value_fa: [0, 4] },
    question_value: "child_accompany",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 4, "label": 4 }
    ]
  },
  {
    question: "آیا پدر و مادرتان با شما سفر می‌کنند؟ ",
    answer: { value_fa: ["هیچ‌کدام", "پدر و مادر با یکدیگر", "فقط پدر / مادر"], value_en: ["0", "1", "2"] },
    question_value: "parent_accompany",
    type: "dropdown",
    options: [
      { "value": "0", "label": "هیچ‌کدام" },
      { "value": "1", "label": "پدر و مادر با یکدیگر" },
      { "value": "2", "label": "فقط پدر / مادر" }
    ]
  },
  {
    question: "آیا همسرتان با شما سفر می‌کند؟ ",
    answer: { value_fa: ["بله", "خیر"], value_en: [1, 0] },
    question_value: "spouse_accompany",
    type: "radio",
    options: [
      { "value": 1, "label": "بله" },
      { "value": 0, "label": "خیر" }
    ]
  },
  {
    question: "چند نفر از برادران و خواهران‌تان با شما سفر می‌کنند؟ ",
    answer: { value_fa: [0, 7] },
    question_value: "sibling_accompany",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 7, "label": 7 }
    ]
  },
  {
    question: "میانگین سن فرزندان‌تان چقدر است؟",
    answer: { value_fa: [1, 30] },
    question_value: "child_average_age",
    type: "number",
    options: [
      { "value": 1, "label": 1 },
      { "value": 30, "label": 30 }
    ]
  },
  {
    question: "چند فرزند دارید؟ ",
    answer: { value_fa: [0, 4] },
    question_value: "child_count",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 11, "label": 11 }
    ]
  },
  {
    question: "میانگین سن برادران و خواهران شما چقدر است؟",
    answer: { value_fa: [0, 50] },
    question_value: "sibling_average_age",
    type: "number",

  },
  {
    question: "چند خواهر یا برادر دارید؟ ",
    answer: { value_fa: [0, 7] },
    question_value: "sibling_count",
    type: "number",

  },
  {
    question: "چه تعداد از اقوام درجه یک شما در خارج از شهر محل اقامت‌تان زندگی می‌کنند؟ ",
    answer: { value_fa: [0, 11] },
    question_value: "long_distance_child_sibling_count",
    type: "number",
    options: [
      { "value": 0, "label": 0 },
      { "value": 11, "label": 11 }
    ]
  },
  {
    question: "چه تعداد از اقوام درجه یک شما در خارج از کشور زندگی می‌کنند؟",
    answer: { value_fa: [0, 11] },
    question_value: "foreign_living_child_sibling_count",
    type: "number",

  },
];
