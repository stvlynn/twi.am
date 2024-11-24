# Twitter MBTI Receipt

A simple web app that generates a Twitter MBTI receipt for a given Twitter ID.

## Try Online

[Twi.AM](https://twi.am)

Enter your Twitter ID (Not Your Username) and click "ANALYZE MBTI" to generate a receipt.

Please wait for approximately 60 seconds for the analysis to complete.

## How It Works

The app uses [Dify.ai](https://dify.ai) to scrape and analyze the Twitter profile using AI Agent and generate a receipt.

## Deploy Your Own

### Frontend

Deploy on Vercel:

Set up the following environment variables:

|Varriable|Default Value|
|-|-|
|`VITE_DIFY_API_URL`|https://api.dify.ai/v1/workflows/run|
|`VITE_DIFY_API_KEY`| |

### Backend

Download DSL file [here](./TwitterReceipt.dsl) and upload to Dify.ai.

You should also get an API Key from crawlbase and set it in the DSL. Name it `token` in environment variables.

## License

MIT License