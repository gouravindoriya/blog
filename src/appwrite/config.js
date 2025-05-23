// authentication service
import { Account,Client,ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl) 
                   .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title,slug,content,featureimage,status,userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureimage,
                    status,
                    userId,
                    slug
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost ::",error);
        }
    }

    async updatePost(slug,{title,content,featureimage,status,userId}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureimage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatepost ::",error);
        }
    }


    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletepost ::",error);
            return false;
        }
    }
    async getPost(slug) {
        try {
           return  await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("appwrite service :: getpost ::",error);
            return false;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]) {
        try {
           return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                
            )
            
        } catch (error) {
            console.log("appwrite service :: getposts ::",error);
            return false;
        }
    }

    async uploadfile(file){
        try {

         return   await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("appwrite service storage:: uploadFile ::",error);
            return false;
        }
    }
    async deletefile(fileid){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid
            )
            return true;
        } catch (error) {
            console.log("appwrite service storage:: deleteFile ::",error);
            return false;
        }
    } 
    previewfile(fileid){
        
        // console.log(this.bucket.getFilePreview(conf.appwriteBucketId,fileid))
        
          return  this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileid
            )
            
       
    } 




}


const service=new Service();
export default service;
