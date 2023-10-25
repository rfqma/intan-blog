'use client'

import { Button } from "@/components/Button"
import { formControlItems, initialBlogFormData } from "@/lib/utilities/data"
import { ChangeEvent, useContext, useState } from "react"
import { firebaseStorage } from "@/lib/databases/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { SmallSpinner } from "@/components/SmallSpinner"
import { GlobalContext } from "@/lib/contexts"
import { BlogFormData } from "@/lib/utilities/types"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import 'react-quill/dist/quill.snow.css'
import './rqCustomStyles.css'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
)

const rqModules = {
  toolbar: [
    [
      {
        header: [1, 2, false]
      }
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link"],
    ["clean"]
  ],
}

const rqFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
]

const createUniqueFileName = (fileName: string) => {
  const timeStamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 12)
  return `${fileName}-${timeStamp}-${randomString}`
}

const handleUploadPostImage = async (file: any) => {
  const getUniqueFileName = createUniqueFileName(file?.name)
  const storageReference = ref(firebaseStorage, `blog-post-images/${getUniqueFileName}`)
  const uploadPostImage = uploadBytesResumable(storageReference, file)

  return new Promise((resolve, reject) => {
    uploadPostImage.on('state_changed',
      (snapshot) => { },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadPostImage.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error))
      })
  })
}

export default function CreatePostPage() {
  const [postImageLoading, setPostImageLoading] = useState<boolean>(false)
  const { postFormData, setPostFormData } = useContext(GlobalContext)
  const { data: session } = useSession()
  const router = useRouter()

  const handlePostImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    setPostImageLoading(true)

    const uploadPostImage: any = await handleUploadPostImage(
      event.target.files[0]
    )

    if (uploadPostImage !== '') {
      setPostImageLoading(false)
      setPostFormData({
        ...postFormData,
        image: uploadPostImage
      })
    }
  }

  const handleCreatePost = async () => {
    const res = await fetch('/api/blog/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...postFormData,
        userId: session?.user?.name,
        userImage: session?.user?.image,
        userEmail: session?.user?.email,
        comments: [],
        createdAt: new Date().toISOString(),
      })
    })

    const data = await res.json()

    if (data && data.success) {
      setPostFormData(initialBlogFormData)
      router.push('/blog')
    }
  }

  return (
    <>
      <section className="py-28 overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mb-12 rounded-md bg-primary/[3%] py-10 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h2 className="mb-3 text-2xl font-semibold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Write Your Own Blog Post
                </h2>
                <div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="w-full">
                        {/* className={`${postImageLoading ? 'w-1/2' : 'w-full'}`} */}
                        <label className="block mb-3 text-sm font-medium text-dark dark:text-white">
                          Upload Post Image
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          max={1000000}
                          onChange={handlePostImageChange}
                          className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                        />
                        {
                          postImageLoading ?
                            <div>
                              <SmallSpinner />
                            </div>
                            :
                            null
                        }
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                      {
                        formControlItems.map((formControl) => {
                          return (
                            <div
                              key={formControl.id}
                              className="w-full px-4"
                            >
                              <label className="block mb-3 text-sm font-medium text-dark dark:text-white">
                                {formControl.label}
                              </label>
                              {
                                formControl.component === 'input' ?
                                  <input
                                    name={formControl.id}
                                    type={formControl.type}
                                    placeholder={formControl.placeholder}
                                    value={postFormData[formControl.id as keyof BlogFormData]}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                      setPostFormData({
                                        ...postFormData,
                                        [formControl.id]: event.target.value
                                      })
                                    }}
                                    className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                                  />
                                  : formControl.component === 'textarea' ?
                                    <>
                                      <ReactQuill
                                        id={formControl.id}
                                        placeholder={formControl.placeholder}
                                        value={postFormData[formControl.id as keyof BlogFormData]}
                                        onChange={(event: string) => {
                                          return setPostFormData({
                                            ...postFormData,
                                            [formControl.id]: event
                                          })
                                        }}
                                        theme="snow"
                                        modules={rqModules}
                                        formats={rqFormats}
                                        className="w-full mb-8 border border-transparent rounded-md resize-none py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                                      />
                                      <textarea
                                        name={formControl.id}
                                        placeholder="You can see content's HTML preview here..."
                                        rows={2}
                                        value={postFormData[formControl.id as keyof BlogFormData]}
                                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                          setPostFormData({
                                            ...postFormData,
                                            [formControl.id]: event.target.value
                                          })
                                        }}
                                        className="w-full mb-8 border border-transparent rounded-md resize-none py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                                        disabled
                                      />
                                    </>
                                    : formControl.component === 'select' ?
                                      <select
                                        name={formControl.id}
                                        placeholder={formControl.placeholder}
                                        value={postFormData[formControl.id as keyof BlogFormData]}
                                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                          setPostFormData({
                                            ...postFormData,
                                            [formControl.id]: event.target.value
                                          })
                                        }}
                                        className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp"
                                      >
                                        <option id="" value="">Select</option>
                                        {
                                          formControl.options.map((optionItem) => {
                                            return (
                                              <>
                                                <option id={optionItem.value} value={optionItem.value}>
                                                  {optionItem.label}
                                                </option>
                                              </>
                                            )
                                          })
                                        }
                                      </select>
                                      : null
                              }
                            </div>
                          )
                        })
                      }
                      <div className="w-full px-4">
                        <Button text="Create New Post" onClick={handleCreatePost} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}