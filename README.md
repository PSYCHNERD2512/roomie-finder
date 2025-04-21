# 🏠 Roomie Finder App

**Roomie Finder** is a React Native mobile application that helps users find compatible roommates based on lifestyle habits and personal preferences. It features a clean onboarding flow, swipe-based profile discovery, and a smart matching algorithm that quantifies compatibility into a percentage score.

---

## 🚀 Features

### 1. **Onboarding**

- Users input details such as:
  - Full Name
  - Department
  - Year of Study
  - Sleep Schedule
  - Cleanliness Habits
  - Guest Policy
  - Sharing Preferences
  - Social Style
  - Music Taste
- A progress bar guides users through the steps, and input validation ensures completeness before proceeding.

### 2. **Swiping Screen**

- Discover potential roommates through a swipe interface:
  - 👉 **Swipe Right** to save a profile.
  - 👈 **Swipe Left** to skip.
- Each profile displays a compatibility percentage and a short summary of shared traits.
- Smooth animations enhance the swiping experience.

### 3. **Saved Profiles**

- View and manage profiles you've saved.
- Remove saved profiles if needed.
- Compatibility details remain visible for easy comparison.

### 4. **Edit Profile**

- Update your preferences anytime.
- Changes automatically recalculate compatibility scores across all profiles.

---

## 🧠 Matching Algorithm

Roomie Finder doesn’t just pair people randomly — it compares users based on lifestyle traits and calculates a weighted **similarity percentage**. Here's how it works:

### 🔍 Trait Breakdown

| Trait              | Description                                                            | Weight |
| ------------------ | ---------------------------------------------------------------------- | ------ |
| **Sleep Schedule** | Compares mapped sleep times (e.g., early bird vs. night owl)           | 25     |
| **Cleanliness**    | Compares preferences from "flexible" to "neat"                         | 15     |
| **Guest Policy**   | Measures alignment in comfort level with guests (none to frequent)     | 15     |
| **Social Style**   | Compares social preferences (quiet to very social)                     | 15     |
| **Sharing Habits** | Evaluates how open users are to sharing items                          | 15     |
| **Department**     | Gives a bonus if users are from the same department                    | 5      |
| **Year of Study**  | Higher compatibility if users are in the same or nearby academic years | 5      |
| **Music Taste**    | Calculates overlap using set intersection of genres                    | 5      |

### 📊 Score Calculation

- Each trait produces a score (0–1), which is multiplied by its weight.
- All weighted scores are added up and divided by the total possible weight to give a final percentage.
- The top two strongest matching traits are used to generate a short summary.

**Example:**

> “You guys are most similar in **cleanliness** and **music taste**.”

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/roomie-finder.git
   cd roomie-finder
   ```
2. **Start the development server**
   ```bash
   npx expo start
   ```
3. **Run the app**
   - Install the **Expo Go** app on your phone.
   - Scan the QR code displayed in your terminal/browser (make sure your computer and phone are on the same Wi-Fi).

---

## 🎥 Demo

[![Watch the video](https://img.youtube.com/vi/QVzJQf7UO5Q/hqdefault.jpg)](https://www.youtube.com/watch?v=QVzJQf7UO5Q)

