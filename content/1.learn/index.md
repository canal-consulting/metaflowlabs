---
title: 'Learn'
description: 'Learn successful development patterns and best-practices for Metaflow.'
navigation: false
surround: false
---

# Metaflowlabs Content

Importantly, Metaflowlabs content is not a replacement for the official Metaflow documentation or the Outerbounds guides
but rather a complement. In fact, for proper SEO and discoverability the content here will be cross-linked with the
official documentation and guides. The content here will be geared towards real-world examples on topics that
are currently missing, and to do that will also provide a deep treatment of basic Metaflow concepts and common patterns
to serve as a foundation.

The overall goal in terms of tone and presentation style is to approach and maintain 3Blue1Brown-level of simplicity and
clarity-Metaflow is delightfully simple with a small surface area so it a great vehicle to do this. I've spent the
last 3+ years teaching this content to less technical audiences so that experience will guide how I cover the material.

## Website

The different types of content are heavily influenced by the [Diataxis framework](https://diataxis.fr/), which provides
a
systematic approach to creating technical
documentation split between four pillars each serving a specific user need and learning context:

![Illustration of the Diataxis framework pillars](/diataxis.png)


---

| Diataxis Pillar | Metaflowlabs Name | Primary Goal    | User Need             | Content Structure                                  | Metaflow Example                                                                      |
|-----------------|-------------------|-----------------|-----------------------|----------------------------------------------------|---------------------------------------------------------------------------------------|
| Explanation     | Deep Dives        | Understanding   | Gain deeper knowledge | Conceptual background, reasoning, context          | _What happens when you `self`_, _Introduction to Environments_, _Effective Branching_ |
| How-to          | Patterns          | Problem-solving | Solve a specific task | Task-oriented instructions, recipes, code examples | _Using Notebooks_, _FastAPI and Metaflow_, _Migrating to Metaflow_                    |
| Tutorials       | Guides            | Learning        | Understand a topic    | Step-by-step guides, practical exercises           | _Triggering flows from S3 Events_                                                     |

---

Each content type will be indexed and available as llm.txt files for easy consumption from LLM scrapers and other
tools (see footer).

## Video

Most content from all three content types above will have paired video content that will be published along with website
content. In addition to the paired content to the Diataxis pillars above, there will be regular community series that
will have their own dedicated pages within the Metaflowlabs site (see /projects for details). All videos will be
published to the OB and/or
Metaflowlabs YouTube
channels.

| Type             | Pair                 | Format                                                                                               | Example                                                                                                                 | 
|------------------|----------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| 1:1 Conversation | Deep Dives           | Conversation between learner and host on the topic                                                   | [Bits and Booze](https://www.youtube.com/playlist?list=PLNXkW_le40U6qleRbjWBxz6RTfwJ8Z2E5)                              |
| Panel Discussion | Deep Dives, Patterns | Group of experienced users detail experience with topic                                              | [Comparing ZenML, Metaflow, and all the other DAG tools](https://www.youtube.com/watch?v=W6hpEO80q20)                   | 
| Walkthrough      | Patterns, Guides     | Host does detailed walkthrough of website example, extra time spent on common pitfalls or edge cases | [Deconstructing "The EventBridge ETL" AWS Serverless Architecture Pattern](https://www.youtube.com/watch?v=8kg5bYsdem4) |
| Series           |                      | Recording of ongoing community series                                                                |                                                                                                                         |

## Repository

The _Pattern_ and _Guide_ types will also be paired with repository content that will be available immediately upon
publication of the website material.

| Type           | Pair     | Format                                                                   | Example                                                                                                                     | 
|----------------|----------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Subdirectory   | Patterns | Self-contained example within larger repository with  detailed README.md | [Sagemaker Examples](https://github.com/aws/amazon-sagemaker-examples)                                                      | 
| New Repository | Guides   | In-depth example with GitHub Pages site with Revealjs presentation       | [aws-samples/aws-genai-conversational-rag-reference](https://github.com/aws-samples/aws-genai-conversational-rag-reference) |