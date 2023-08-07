## General Questions

Can you post a youtube video that is not viewable on youtube, but viewable on an external embed?
Can you verify that someone is the owner of a domain?

## One approach

Headless CMS (Can headless CMS also use video and audio?)

I know you said without a CMS but why don't you try a headless CMS instead of a traditional? If you really want to work with Mongo you can easily set it as your database. Plus there are many headless CMSs out there that are build with Node.js that makes your life so much easier while maintaining app speed. Plus if you are planning on creating a blog for a client in the future they can easily add and edit posts themselves and you'll just have to build the Front End with React. Pretty much everything else is gonna be handled by the CMS and you can focus on React.

If you're interested in headless CMSs I would highly recommend Strapi! It's super easy to work with and you can easily play around with it plus there are many tutorials out there. I've used it for a few side projects and it's my go to CMS.

## Another Approach

I would probably take something like the following approach:

Your blogposts are saved as .md files and stored in AWS S3 or Azure Blob Storage or whatever you have available or prefer.

Each blog post is an entry in your MongoDB that contains any metadata you want, it's unique ID, and the file path to where it lives in your storage account.

Any updates to existing blog posts can use this file path and ID to just overwrite the old one, or you could append a version to them so you always keep a history.

When a client requests a blog post, you can get the ID of the record from the request, and look it up in your DB. Your DB now knows where it lives in your storage account, and so your server can look it up and download it. It SSR's this content into your React app as the child of ReactMarkdown and then sends this back to the client.

I think this provides you a few benefits:

It's going to be way cheaper than storing the blog content itself in a database. Data at rest is a fraction of the cost.

You can ensure that the requests for your blog content are only happening from your server and it lets you do a full SSR experience.

You can easily keep versions and version history since they're all just files.

You don't have to worry about any string string mutations that may cause some unintended side effects.

### med-ts-node

This is the source code for my tutorial on medium

[Article link](https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee)
