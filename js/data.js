/*
 * data.js - reference data and text content for Poshan Sathi.
 *
 * IMPORTANT: The weight-for-age values below are APPROXIMATE values taken at
 * key ages from the WHO Child Growth Standards and are linearly interpolated
 * between ages. They are good enough for a prototype. Before real-world use,
 * replace WFA with the full official WHO monthly tables
 * (https://www.who.int/tools/child-growth-standards) and have the content
 * reviewed by a nutritionist / Anganwadi supervisor.
 *
 * Row format: [age_in_months, -3SD, -2SD, median]  (weights in kg)
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NutriData = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const WFA = {
    boys: [
      [0, 2.1, 2.5, 3.3], [6, 5.7, 6.4, 7.9], [12, 6.9, 7.7, 9.6], [18, 7.8, 8.8, 10.9],
      [24, 8.6, 9.7, 12.2], [36, 10.0, 11.3, 14.3], [48, 11.2, 12.7, 16.3], [60, 12.4, 14.1, 18.3]
    ],
    girls: [
      [0, 2.0, 2.4, 3.2], [6, 5.1, 5.7, 7.3], [12, 6.0, 7.0, 8.9], [18, 7.1, 8.1, 10.2],
      [24, 7.9, 9.0, 11.5], [36, 9.5, 10.8, 13.9], [48, 10.8, 12.3, 16.1], [60, 12.0, 13.7, 18.2]
    ]
  };

  // MUAC screening cut-offs (cm) for children 6-59 months (WHO).
  const MUAC = { severe: 11.5, moderate: 12.5 };

  const BANDS = [
    { id: '0-5', min: 0, max: 5 },
    { id: '6-11', min: 6, max: 11 },
    { id: '12-23', min: 12, max: 23 },
    { id: '24-35', min: 24, max: 35 },
    { id: '36-72', min: 36, max: 72 }
  ];

  const DIET = {
    en: {
      '0-5': {
        title: '0-5 months: Breast milk only',
        points: [
          'Start breastfeeding within 1 hour of birth; breast milk only for the first 6 months.',
          'Feed on demand, day and night (8 or more times a day).',
          'No water, honey, animal milk, or other food - they are not needed and can cause infections.',
          'Keep the baby clean and complete all vaccinations on time.'
        ]
      },
      '6-11': {
        title: '6-11 months: Start soft foods',
        points: [
          'Keep breastfeeding on demand.',
          'Give 2-3 small meals a day. Start with 2-3 spoons and increase slowly.',
          'Good foods: mashed khichdi, ragi porridge, mashed dal-rice, mashed banana, well-cooked egg.',
          'Add 1 teaspoon of ghee or oil to each meal for extra energy.',
          'Wash your hands and the baby\'s hands with soap before feeding.'
        ]
      },
      '12-23': {
        title: '12-23 months: Family foods in small pieces',
        points: [
          'Continue breastfeeding.',
          '3-4 meals plus 1-2 snacks every day.',
          'Dal, rice, roti, ragi porridge, vegetables, egg, milk, curd - mashed or chopped small.',
          'Give a vitamin-C food (guava, lemon, amla) with iron-rich foods (green leafy vegetables, jaggery, ragi).',
          'Give an egg or another protein food (dal, milk, curd) every day if possible.'
        ]
      },
      '24-35': {
        title: '2-3 years: Eats with the family',
        points: [
          '3 meals plus 2 snacks every day.',
          'Add one portion of green leafy vegetables and one seasonal fruit daily.',
          'Snack ideas: banana, boiled egg, roasted chana, groundnut chikki, sprouts.',
          'Use iodised salt in small amounts. Avoid chips, biscuits and sugary drinks.',
          'Let the child eat with the family and never force-feed.'
        ]
      },
      '36-72': {
        title: '3-6 years: Anganwadi meal + home food',
        points: [
          'Anganwadi supplementary nutrition aims to give about 500 kcal and 12-15 g protein a day (check current ICDS guidelines).',
          'Sample day - Morning: ragi malt or porridge with jaggery.',
          'Anganwadi hot meal: rice/roti + dal + vegetables (egg 3-4 days a week).',
          'Evening snack: roasted chana, groundnut chikki, banana or sprouts.',
          'Dinner at home: roti/rice + dal + green leafy vegetables + curd.',
          'Wash hands with soap before eating; drink boiled or filtered water.'
        ]
      }
    },
    hi: {
      '0-5': {
        title: '0-5 माह: केवल माँ का दूध',
        points: [
          'जन्म के 1 घंटे के भीतर स्तनपान शुरू करें; पहले 6 माह केवल माँ का दूध दें।',
          'दिन-रात जब बच्चा चाहे दूध पिलाएँ (दिन में 8 या अधिक बार)।',
          'पानी, शहद, जानवर का दूध या कोई और आहार न दें - इनसे संक्रमण हो सकता है।',
          'बच्चे को साफ रखें और सभी टीके समय पर लगवाएँ।'
        ]
      },
      '6-11': {
        title: '6-11 माह: नरम आहार शुरू करें',
        points: [
          'स्तनपान जारी रखें।',
          'दिन में 2-3 बार थोड़ा-थोड़ा खाना दें। 2-3 चम्मच से शुरू करके धीरे-धीरे बढ़ाएँ।',
          'अच्छे आहार: मसली खिचड़ी, रागी दलिया, मसला दाल-चावल, मसला केला, अच्छी तरह पका अंडा।',
          'अधिक ऊर्जा के लिए हर बार खाने में 1 चम्मच घी या तेल मिलाएँ।',
          'खिलाने से पहले अपने और बच्चे के हाथ साबुन से धोएँ।'
        ]
      },
      '12-23': {
        title: '12-23 माह: परिवार का खाना छोटे टुकड़ों में',
        points: [
          'स्तनपान जारी रखें।',
          'रोज़ 3-4 बार भोजन और 1-2 बार नाश्ता दें।',
          'दाल, चावल, रोटी, रागी दलिया, सब्ज़ी, अंडा, दूध, दही - मसलकर या छोटे टुकड़ों में।',
          'आयरन वाले आहार (हरी पत्तेदार सब्ज़ी, गुड़, रागी) के साथ विटामिन-सी (अमरूद, नींबू, आँवला) दें।',
          'हो सके तो रोज़ एक अंडा या कोई प्रोटीन आहार (दाल, दूध, दही) दें।'
        ]
      },
      '24-35': {
        title: '2-3 वर्ष: परिवार के साथ भोजन',
        points: [
          'रोज़ 3 भोजन और 2 नाश्ते दें।',
          'रोज़ हरी पत्तेदार सब्ज़ी और एक मौसमी फल शामिल करें।',
          'नाश्ते के विकल्प: केला, उबला अंडा, भुना चना, मूँगफली की चिक्की, अंकुरित अनाज।',
          'आयोडीन युक्त नमक थोड़ा सा इस्तेमाल करें। चिप्स, बिस्कुट और मीठे पेय से बचें।',
          'बच्चे को परिवार के साथ खाने दें; ज़बरदस्ती न खिलाएँ।'
        ]
      },
      '36-72': {
        title: '3-6 वर्ष: आंगनवाड़ी भोजन + घर का खाना',
        points: [
          'आंगनवाड़ी पूरक पोषण का लक्ष्य रोज़ लगभग 500 किलो कैलोरी और 12-15 ग्राम प्रोटीन देना है (ताज़ा ICDS दिशानिर्देश देखें)।',
          'नमूना दिन - सुबह: गुड़ के साथ रागी माल्ट या दलिया।',
          'आंगनवाड़ी का गर्म भोजन: चावल/रोटी + दाल + सब्ज़ी (हफ्ते में 3-4 दिन अंडा)।',
          'शाम का नाश्ता: भुना चना, मूँगफली चिक्की, केला या अंकुरित अनाज।',
          'रात का खाना घर पर: रोटी/चावल + दाल + हरी पत्तेदार सब्ज़ी + दही।',
          'खाने से पहले साबुन से हाथ धोएँ; उबला या फ़िल्टर किया पानी पिएँ।'
        ]
      }
    }
  };

  const SEVERE_CARE = {
    en: [
      'Refer to the nearest PHC / Nutrition Rehabilitation Centre (NRC) for a medical check-up now.',
      'Give small energy-dense meals 5-6 times a day (add ghee/oil, jaggery, groundnut, milk).',
      'Continue breastfeeding if the child is still breastfed.',
      'Look for danger signs: swelling of both feet, fever, poor appetite, diarrhoea, fast breathing.',
      'Follow up weekly and weigh again after 2 weeks.'
    ],
    hi: [
      'तुरंत नज़दीकी PHC / पोषण पुनर्वास केंद्र (NRC) में जाँच के लिए भेजें।',
      'दिन में 5-6 बार थोड़ा-थोड़ा ऊर्जा-युक्त भोजन दें (घी/तेल, गुड़, मूँगफली, दूध मिलाएँ)।',
      'यदि बच्चा स्तनपान करता है तो जारी रखें।',
      'खतरे के संकेत देखें: दोनों पैरों में सूजन, बुखार, भूख न लगना, दस्त, तेज़ साँस।',
      'हर हफ्ते फॉलो-अप करें और 2 हफ्ते बाद दोबारा वज़न लें।'
    ]
  };

  const TIPS = {
    en: [
      'Exclusive breastfeeding for 6 months protects babies from infections.',
      'Colourful plates are healthy plates: add green, yellow and orange vegetables and fruits.',
      'Ragi, jaggery and green leafy vegetables help prevent anaemia.',
      'Eggs, dal, milk and curd give protein for growth.',
      'Wash hands with soap before cooking, feeding and eating.',
      'Weigh the child every month and record it on the growth chart.',
      'Give only boiled or filtered water; keep food covered.'
    ],
    hi: [
      '6 माह तक केवल स्तनपान बच्चों को संक्रमण से बचाता है।',
      'रंग-बिरंगी थाली स्वस्थ थाली है: हरी, पीली और नारंगी सब्ज़ी-फल शामिल करें।',
      'रागी, गुड़ और हरी पत्तेदार सब्ज़ियाँ खून की कमी से बचाती हैं।',
      'अंडा, दाल, दूध और दही से बच्चों को वृद्धि के लिए प्रोटीन मिलता है।',
      'खाना बनाने, खिलाने और खाने से पहले साबुन से हाथ धोएँ।',
      'हर महीने बच्चे का वज़न लें और ग्रोथ चार्ट में लिखें।',
      'केवल उबला या फ़िल्टर किया पानी पिलाएँ; खाना ढककर रखें।'
    ]
  };

  const QUIZ = {
    en: [
      { q: 'For how many months should a baby get only breast milk?', o: ['3', '6', '9'], a: 1 },
      { q: 'Which food helps prevent anaemia?', o: ['Green leafy vegetables', 'Sugary drinks', 'Chips'], a: 0 },
      { q: 'When should hands be washed with soap?', o: ['Only after eating', 'Before cooking, feeding and eating', 'Never'], a: 1 },
      { q: 'Which is a good protein food for children?', o: ['Dal, egg, milk', 'Soft drinks', 'Biscuits'], a: 0 },
      { q: 'How often should a child be weighed?', o: ['Once a year', 'Every month', 'Only when sick'], a: 1 }
    ],
    hi: [
      { q: 'शिशु को कितने माह तक केवल माँ का दूध देना चाहिए?', o: ['3', '6', '9'], a: 1 },
      { q: 'कौन सा आहार खून की कमी से बचाता है?', o: ['हरी पत्तेदार सब्ज़ियाँ', 'मीठे पेय', 'चिप्स'], a: 0 },
      { q: 'साबुन से हाथ कब धोने चाहिए?', o: ['केवल खाने के बाद', 'खाना बनाने, खिलाने और खाने से पहले', 'कभी नहीं'], a: 1 },
      { q: 'बच्चों के लिए अच्छा प्रोटीन आहार कौन सा है?', o: ['दाल, अंडा, दूध', 'कोल्ड ड्रिंक', 'बिस्कुट'], a: 0 },
      { q: 'बच्चे का वज़न कितनी बार लेना चाहिए?', o: ['साल में एक बार', 'हर महीने', 'केवल बीमार होने पर'], a: 1 }
    ]
  };

  return { WFA, MUAC, BANDS, DIET, SEVERE_CARE, TIPS, QUIZ };
});
