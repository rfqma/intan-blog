import { BlogFormData, BlogCategoryOption, BlogFormControlItem, HeaderMenuItem } from "./types";

export const menuItems: HeaderMenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/blog'
  },
  {
    id: 'category',
    label: 'Category',
    path: '/category/life'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search'
  }
]

export const categoryOptions: BlogCategoryOption[] = [
  {
    value: 'tech',
    label: 'Technology'
  },
  {
    value: 'life',
    label: 'Life'
  }
]

export const formControlItems: BlogFormControlItem[] = [
  {
    id: 'title',
    label: 'Title',
    placeholder: 'Enter Post Title',
    type: 'text',
    component: 'input',
    options: []
  },
  {
    id: 'summary',
    label: 'Summary',
    placeholder: 'Enter Post Summary',
    type: 'text',
    component: 'input',
    options: []
  },
  {
    id: 'content',
    label: 'Content',
    placeholder: 'Enter Post Content',
    type: 'text',
    component: 'textarea',
    options: []
  },
  {
    id: 'category',
    label: 'Category',
    placeholder: 'Select Post Category',
    type: '',
    component: 'select',
    options: categoryOptions
  }
]

export const initialBlogFormData: BlogFormData = {
  title: '',
  summary: '',
  content: '',
  image: '',
  category: ''
}