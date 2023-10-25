export type HeaderMenuItem = {
  id: string
  label: string
  path: string
}

export type BlogCategoryOption = {
  value: string
  label: string
}

export type BlogFormControlItem = {
  id: string,
  label: string,
  placeholder: string,
  type: string,
  component: string,
  options: BlogCategoryOption[]
}

export type BlogFormData = {
  title: string
  summary: string
  content: string
  image: string
  category: string
}

export type Blog = {
  id: number
  title: string
  summary: string
  content: string
  category: string
  userId: string
  userImage: string
  userEmail: string
  comments: string[]
  image: string
  createdAt: Date
}