# Chatbot Prompting Process

This document explains how the chatbot is prompted and how image retrieval is triggered and handled during a conversation.

---

## 1. Initialization

At the start of each session, the chatbot is initialized with the following two components:

- **Instruction Text**: A set of guiding prompts or system instructions.
- **Case Description**: Contextual information for a particular use case.

Both the instruction text and the case description are queried from a MongoDB database. If multiple cases are available, one is selected **randomly** to ensure variation.

---

## 2. Image Retrieval Trigger

As the chatbot responds to the user, the **frontend continuously monitors the response text** for a specific image retrieval trigger.

### Trigger Format

The trigger phrase is embedded in the **instruction text** and follows this format:

"Related Image Found. The image ID is {id}"

When this phrase is detected by the frontend:

- The phrase is **replaced with a blank entry** in the UI.
- The corresponding image is then **queried from the database** using the given ID and displayed to the user.

---

## 2.1 Previous Attempts: Reasoning-Based Output

We experimented with a **reasoning + output** approach in the `reasoning` branch. This method involved the chatbot reasoning through the case before outputting the image.

- **Pros**: More stable and accurate retrieval.
- **Cons**: Too time-consuming and slowed down the conversation.
- **Conclusion**: Fast communication is preferred, so this method was abandoned.

---

## 2.2 Instruction Design Tips

- Placing the **image ID and its description** **close together** in the instruction text improves the likelihood of the frontend correctly triggering the image retrieval.

---

## 2.3 Current Limitations

One major bottleneck in the current implementation is **inconsistent image output**:

- In some trials, the chatbot correctly triggers image retrieval. In other trials, no image is triggered even when expected.

Efforts are ongoing to improve the reliability and frequency of image provisioning.

---

