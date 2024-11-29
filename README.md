# Twi.AM - Twitter MBTI Receipt

A simple web app that generates a Twitter MBTI receipt for a given Twitter ID.

> [!NOTE]  
> **Twi.AM** comes from "Twitter" + "I AM", referring to Twitter analyzer and "I am what". It's made for you to know better of yourself.

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

Download DSL file [here](./TwitterReceipt.yml) and upload to Dify.ai.

You should also get an API Key from crawlbase and set it in the DSL. Name it `token` in environment variables.

## Sponsoring

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/stvlynn)

<iframe src="https://github.com/sponsors/stvlynn/button" title="Sponsor stvlynn" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

ETH: 0xEbf67cd24fa23fde69843cA4119cE946d8c231F5

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=stvlynn/twi.am&type=Date)](https://star-history.com/#stvlynn/twi.am&Date)

## Contributors

[![Contributors](https://contrib.rocks/image?repo=stvlynn/twi.am)](https://github.com/stvlynn/twi.am/graphs/contributors)

## Thanks For Sponsoring

- [![](./img/Kimi.svg)](https://kimi.moonshot.cn/)

- [Minghan Zhang](https://github.com/zmh-program)

- [Luna5ama](https://x.com/Luna5ama)

## License

[AGPL-3.0](./LICENSE)
