export type SchoolTranslations = {
  profile: {
    header: {
      schoolId: string;
      principalInfo: string;
      address: string;
    };
    stats: {
      totalStudents: string;
      totalTeachers: string;
      totalStaff: string;
      classrooms: string;
    };
    charts: {
      enrollment: {
        title: string;
        subtitle: string;
        newStudents: string;
        totalEnrolled: string;
      };
      staffDistribution: {
        title: string;
        subtitle: string;
        departments: {
          teaching: string;
          administrative: string;
          support: string;
          management: string;
        };
      };
    };
    facilities: {
      title: string;
      subtitle: string;
      updateButton: string;
      types: {
        classroom: string;
        laboratory: string;
        library: string;
        playground: string;
        cafeteria: string;
        gymnasium: string;
      };
    };
    overview: {
      title: string;
      description: string;
      sections: {
        history: string;
        mission: string;
        vision: string;
        values: string;
      };
    };
    accreditations: {
      title: string;
      updateButton: string;
      noAccreditations: string;
    };
    quickActions: {
      title: string;
      updateInfo: string;
      manageStaff: string;
      manageClasses: string;
      viewReports: string;
    };
  };
};

export type MealTranslations = {
  preOrder: {
    infoMessage: string;
    viewTimeReport: string;
    studentSelection: string;
    allergenInfo: string;
    foodTypes: {
      all: string;
      vegetarian: string;
      nonVegetarian: string;
    };
    weekSelection: string;
    addMeal: string;
    removeSlot: string;
    selectedMeals: {
      title: string;
      noMealsMessage: string;
      subtotal: string;
      serviceFee: string;
      total: string;
      clearSelection: string;
      confirmPayment: string;
    };
  };
};

declare module 'next-intl' {
  interface Messages {
    school: SchoolTranslations;
    meals: MealTranslations;
  }
}
