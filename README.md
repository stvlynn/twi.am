# Twitter MBTI Receipt

A simple web app that generates a Twitter MBTI receipt for a given Twitter ID.

![](./og-img.png)

## Try Online

[Twi.AM](https://twi.am)

Enter your Twitter ID (Not Your Username) and click "ANALYZE MBTI" to generate a receipt.

Please wait for approximately 60 seconds for the analysis to complete.

## How It Works

The app uses [Dify.ai](https://dify.ai) to scrape and analyze the Twitter profile using AI Agent and generate a receipt.

## Deploy Your Own

### Frontend

Deploy on Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstvlynn%2Ftwitter_receipt)

Set up the following environment variables:

|Variable|Default Value|Description|
|-|-|-|
|`VITE_DIFY_API_URL`|https://api.dify.ai/v1/workflows/run|Dify API endpoint|
|`VITE_DIFY_API_KEY`| |Your Dify API key|
|`VITE_GA_ID`| |Google Analytics measurement ID (optional)|

### Backend

Download DSL file [here](./TwitterReceipt.dsl) and upload to Dify.ai.

You should also get an API Key from crawlbase and set it in the DSL. Name it `token` in environment variables.

## License

[AGPL-3.0](./LICENSE)