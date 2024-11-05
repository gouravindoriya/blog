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
            } else {
                const newPost = await service.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featureimage: fileId,
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row md:flex-wrap p-5 max-w-screen mx-auto bg-white shadow-lg rounded-lg">
            <div className="md:w-2/3 px-2 mb-6 md:mb-0">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="mb-4"
                />
            </div>
            
            <div className="md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {/* Display image preview */}
                {(post?.featureimage || imagePreview) && (
                    <div className="w-full mb-4">
                        <img
                            src={imagePreview || service.previewfile(post.featureimage)}
                            alt={post?.title || "Preview"}
                            className="rounded-lg w-full"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full text-white font-semibold py-3 mt-40 rounded-lg transition duration-200 hover:bg-black"
                    disabled={loading}
                >
                    {loading ? "Processing..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
