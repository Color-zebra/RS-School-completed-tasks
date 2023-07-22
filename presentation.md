[YouTube link](https://www.youtube.com/watch?v=ZfHOzR_qCg0)

[Deploy link](https://rolling-scopes-school.github.io/color-zebra-JSFE2023Q1/presentation/)

I want to talk about the architecture for frontend applications called FSD.

Let's start with a general question, what is architecture and why is it needed?
An architecture is a set of rules and conventions for organizing code. It has different goals, but the main one is to make the project understandable and structured, especially in the context of regular changes.

Let's go directly to FSD. FSD is an acronym that stands for Feature Sliced Design
FSD main features:
- Exclusively for the frontend.
- May be overkill for small projects. (However, the methodology helps to think about the application in a 
more structured way, so it makes sense to use it even for small applications, if time permits).
- May not be suitable for VERY large applications. (However, it may well serve as a starting point for 
building a more suitable architecture).
- Suitable for any framework. (Although the methodology was originally created for react applications, it 
is great for other frameworks, and even for vanilla JS).

According to FSD, the project consists of layers, each layer consists of slices, each slice consists of 
segments. Despite the apparent complexity, we are not required to implement the entire structure 
using only those parts that are needed in the current project. We'll talk about this later.

A layer is the first level of an organizational hierarchy. Their goal is to separate the code based on the 
degree of responsibility and dependencies on other modules. The higher the layer, the higher the 
degree of its responsibility and the number of dependencies.

- Standardized in all projects.
- Arranged vertically. Top-down interaction. A module can interact with modules located strictly below, but not with those located above or at the same level.

The layers are listed from bottom to top.


1. Shared - reusable code that is not related to business specifics. There may be code that works with 
the API, UI elements (without linking them to the application logic), UI libraries.
2. Entities - the minimum basic entities, "bricks" that form the essence of the project. Unlike the shared 
layer, modules here already have value for the logic of the application.
3. Features - interaction with the user, any actions that are of value to the user. The code found here 
may contain interactive elements, internal state, API requests. For example, the authorization process, 
the process of creating a post.
4. Widgets - a composition layer, a self-sufficient block for connecting entities and features. For 
example, a website header, a wall with posts.
5. Pages - Just like widgets, the composition layer, full-fledged pages are assembled on this layer from 
widgets, features and entities. For example, profile page, news feed page, community page.
6. Processes - a layer with scripts covering several pages. Initially, it was a way out of a situation where 
complex interaction between pages was required. Routing is the most common example. In the current 
specification, this layer is deprecated, it is recommended to distribute its content between the App and 
Features layers, and use the Processes layer only if the App layer grows too large and needs to be 
offloaded.
7. App - settings, styles and providers for the application as a whole. There may be a router, styles, data 
stores, application setup logic.

Let's see one of the options for splitting the application into layers using the example of a github.

 - On the shared layer, select some common, impersonal controls, 
 - On the entities layer, we implement general controls into specific entities, for example, the number of stars the repository has, the number of forks 
 - On the features layer, the logic of individual user scenarios is processed, for example, a drop-down list when clicking on the branch name or put, remove the star of the repository 
 - On the widgets layer, we collect already functional, independent blocks, for example, a code block with the ability to view branches, a block with information about the repository, with the ability to set stars or create a fork. 
 - On the pages layer, we assemble the final pageы from widgets. 
 - On the processes layer, we add the logic of interaction between pages, for example, creating a repository or performing authorization. 
 - On the app layer, we implement things common to the entire application, setting up common styles, page switching logic, and more.

Slice.

Slices are the second level of the organizational hierarchy. Their main purpose is to group code by its 
value to the application. Slice names are not standardized as they are defined by the application scope. 
For example, for a photo gallery, we can use the “photo”, “create-album”, “gallery-page” slices, while 
for a social network we need completely different slices.
The organization of the code inside the slice can be any, as long as the slice has a high-quality public API. 
To work with this slice, external modules should only refer to the public API, and not to the internal file 
structure of this slice. It is important!

Let's dwell on what a public API is and why it is important that every slice has it.
A public API is a public interface that provides a single point of access to all the capabilities of a module 
and determines how this module will interact with the outside world.
Using the public API:
1) Protects the internal structure of modules from uncontrolled change. When accessing the module 
through the public API, we will not be able to change the module in any way (of course, if we have not 
provided methods for this change in the API, if this is necessary for the application to work).
2) Helps to encapsulate modules, protecting some modules from being modified by reworking other 
modules.
3) Allows you to easily define module behaviors based on API methods.

Segments are the third and final level of the organizational hierarchy. Their task is to group the code 
according to its technical nature. There are several standardized segment names.
- UI - user interface components, data formatting functions.
- Model - business logic and data storage, a function for data processing.
- Lib – auxiliary code, libraries.
- Api - interactions with external APIs.

At the end of the presentation, I want to draw your attention to the fact that there are not so many 
things in the FSD architecture that are strictly mandatory. These include 3 things:
Splitting the application into layers, and layers into slices.
Each slice must have a public API.
A module cannot use other modules at the same level of the hierarchy or above, only those below.
Against:
We don't have to implement all the layers, just those needed for the current application are sufficient.
We are not required to divide the slice into segments if we do not need to decompose the code.