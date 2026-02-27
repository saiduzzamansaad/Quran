export const toArabicNumber = (num) => {
      const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
      return num.toString().replace(/\d/g, d => arabicDigits[d])
    }