import { NextApiHandler } from 'next'

const exitPreview: NextApiHandler = (_, response) => {
  // Exit the currentuserfrom "Preview Mode".
  response.clearPreviewData()

  // 307 (temporary) redirect to homepage
  response.redirect('/')
  response.end()
}

export default exitPreview
