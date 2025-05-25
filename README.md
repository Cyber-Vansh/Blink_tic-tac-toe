# Blink Tac Toe

## Tech Stack
This game is built using React with plain JavaScript, and styled with simple CSS.

## Emoji Categories
Players can choose from fun emoji categories like:
- Animals (🐶, 🐱, 🐵, 🐰)
- Food (🍕, 🍟, 🍔, 🍩)
- Sports (⚽, 🏀, 🏈, 🎾)
- Faces (😀, 😎, 🥳, 🤖)
- Fruits (🍎, 🍌, 🍓, 🍇)
- Nature (🌳, 🌸, 🌞, 🌈)
- Vehicles (🚗, 🚲, ✈️, 🚀)
- Music (🎵, 🎸, 🎹, 🎤)
- Flags (🇮🇳, 🇵🇰, 🇱🇰, 🇧🇹)
- Space (🌌, 🌠, 🚀, 🪐)

## How the “Vanishing” Feature Works
Each player can only have 3 emojis on the board at a time. The game tracks each player’s moves in an array. When a player places a new emoji while already having 3 on the board, the oldest emoji (the first move in their array) is removed from the board and their moves list. This makes the oldest emoji "vanish," keeping the gameplay dynamic and fast-paced.

## Power-Up Features
The game includes special power-ups to add strategy and excitement:
- **Swap:** Swap one of your opponent's emojis with an empty cell on the board.
- **Double Move:** Make two moves consecutively in your turn.
- **Block:** Block an empty cell to prevent either player from placing an emoji there for the rest of the game.

Power-ups are randomly assigned at the start of each player’s turn and can be activated strategically.

## What I’d Improve With More Time
- Add an AI opponent for solo play.
- Polish the UI with animations, sounds, and better responsiveness.
- Enhance accessibility for keyboard navigation and screen readers.
- Add more diverse and customizable emoji categories and power-ups.
