import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);

    const submit = async (data) => {
        console.log(data)
        setLoading(true);
        try {
            let fileId;

            if (data.image && data.image[0]) {
                
                const file = await service.uploadfile(data.image[0]);
                
                fileId = file?.$id;
               
                // If updating a post, delete the previous image if a new one was uploaded
                if (post && post.featureimage) {
                    await service.deletefile(post.featureimage);
                }
            }

            if (post) {
                const updatedPost = await service.updatePost(post.$id, {
                    ...data,
                    featureimage: fileId || post.featureimage,
                });
                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
            } 
            else {
               console.log({...data})
                
                const newPost = await service.createPost({
    
                    title:data.title,
                    slug:data.slug,
                    content:data.content,
                    status:data.status,
                    featureimage:fileId,
                    userId: userData.$id,

                   
                });
                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        } catch (error) {
            console.error("Failed to submit the post:", error);
            alert("There was an error submitting the post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    // Watch for changes to the title and automatically update the slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Set image preview for new post uploads
    useEffect(() => {
        if (getValues("image")?.[0]) {
            const file = getValues("image")[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [watch("image")]);

    return (
        <form onSubmit={handleSubmit(submit)} className=" md:flex md:flex-wrap ">
            <div className="md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 px-3 py-2 rounded-md w-full md:w-3/4 border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
                    {...register("title", { required: true })}
                />
                <Input
                    label="slug :"
                    placeholder="slug"
                    className="mb-4 px-3 py-2 rounded-md w-full md:w-3/4 border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            
            <div className="md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {/* Display image preview */}
                {(post?.featureimage || imagePreview) && (
                    <div className="w-full mb-4">
                        <img
                            src={imagePreview || service.previewfile(post.featureimage)}
                            alt={post?.title || "Preview"}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={loading}>
                    {loading ? "Processing..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;

