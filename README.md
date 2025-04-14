# Sentence Completion Quiz Web App

## Overview
This is a sentence completion quiz web app designed to test users' ability to fill in blanks in sentences with the correct words. The app has the following features:

- Display sentences with blanks and 4 word options.
- Allow users to fill and unfill blanks.
- A 15-second timer per question.
- Auto-next on timer end.
- Enable 'Next' only when all blanks are filled.
- The quiz data is imported from a local questions.json file and used within the app.
- Show a final feedback screen with correct/incorrect answers and total score.

## Features
- **Timer**: Displays a countdown timer for each question.
- **Sentence Constructor**: Sentences with missing words are shown, and users can select one of the 4 word options.
- **State Management**: Uses Redux Toolkit to manage the state of the application.
- **JSON Data**: The quiz data is imported directly from a local questions.json file and used within the app.

## Components
- **TimerAndQuit**: Handles the timer countdown and quit functionality.
- **QuestionText**: Displays the sentence with blanks.
- **OptionsGrid**: Displays the word options for the user to choose from.
- **NextButton**: Moves to the next question after the current one is answered.

