

![Screenshot 2025-04-12 025628](https://github.com/user-attachments/assets/654de18c-dbe5-4879-bd50-4ed01cd15d04)

```ruby
.
├── apache
│   ├── Dockerfile.apache
│   ├── apache_server.conf
│   └── httpd.conf
├── backend
│   ├── API
│   │   └── AI.py
│   ├── Dockerfile.backend
│   ├── app.py
│   ├── celerybeat-schedule
│   ├── helpers
│   │   ├── analogy_stream_helper.py
│   │   ├── async_tasks.py
│   │   ├── celery_app.py
│   │   ├── global_rate_limiter.py
│   │   ├── grc_stream_helper.py
│   │   ├── rate_limiter.py
│   │   ├── scenario_helper.py
│   │   └── xploitcraft_helper.py
│   ├── middleware
│   │   └── subscription_check.py
│   ├── models
│   │   ├── newsletter.py
│   │   ├── password_reset.py
│   │   └── test.py
│   ├── mongodb
│   │   └── database.py
│   ├── requirements.txt
│   ├── routes
│   │   ├── admin_newsletter_routes.py
│   │   ├── analogy_routes.py
│   │   ├── contact_form.py
│   │   ├── cracked_admin.py
│   │   ├── grc_routes.py
│   │   ├── newsletter_routes.py
│   │   ├── oauth_routes.py
│   │   ├── password_reset_routes.py
│   │   ├── scenario_routes.py
│   │   ├── subscription_routes.py
│   │   ├── support_routes.py
│   │   ├── test_routes.py
│   │   └── xploit_routes.py
│   └── utils
│       ├── apple_iap_verification.py
│       └── email_sender.py
├── bandit.yaml
├── docker-compose.yml
├── frontend
│   └── my-react-app
│       ├── Dockerfile.audit
│       ├── Dockerfile.dev
│       ├── Dockerfile.frontend
│       ├── eslint.config.mjs
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   ├── android-chrome-192x192.png
│       │   ├── android-chrome-512x512.png
│       │   ├── apple-touch-icon.png
│       │   ├── favicon-16x16.png
│       │   ├── favicon-32x32.png
│       │   ├── favicon.ico
│       │   ├── images
│       │   ├── index.html
│       │   ├── ios.png
│       │   ├── manifest.json
│       │   ├── robots.txt
│       │   ├── site.webmanifest
│       │   ├── sitemap.xml
│       │   └── xp
│       │       ├── xp10.png
│       │       ├── xp100.png
│       │       ├── xp200.png
│       │       ├── xp25.png
│       │       ├── xp50.png
│       │       └── xp_mongo.js
│       └── src
│           ├── App.js
│           ├── components
│           │   ├── ConfettiAnimation.js
│           │   ├── Footer.js
│           │   ├── FormattedQuestion.js
│           │   ├── GlobalTestList.js
│           │   ├── GlobalTestPage.js
│           │   ├── PrivacyPolicyIOS.js
│           │   ├── ProtectedRoute.js
│           │   ├── SEOHelmet.js
│           │   ├── Sidebar
│           │   │   ├── Sidebar.css
│           │   │   ├── Sidebar.js
│           │   │   └── sidebarlogo.png
│           │   ├── StructuredData.js
│           │   ├── colorMapping.js
│           │   ├── cracked
│           │   │   ├── CrackedAdminDashboard.js
│           │   │   ├── CrackedAdminLoginPage.js
│           │   │   ├── images
│           │   │   │   ├── image1.jpg
│           │   │   │   ├── image2.jpg
│           │   │   │   ├── image3.jpg
│           │   │   │   ├── image4.jpg
│           │   │   │   ├── image5.jpg
│           │   │   │   ├── image6.jpg
│           │   │   │   ├── image7.jpg
│           │   │   │   ├── image8.jpg
│           │   │   │   └── image9.jpg
│           │   │   ├── music
│           │   │   │   └── elevator-music.mp3
│           │   │   ├── styles
│           │   │   │   ├── CrackedAdminDashboard.css
│           │   │   │   ├── CrackedAdminLogin.css
│           │   │   │   └── tabstyles
│           │   │   │       ├── ActivityLogsTab.css
│           │   │   │       ├── DailyTab.css
│           │   │   │       ├── DbShellTab.css
│           │   │   │       ├── HealthCheckTab.css
│           │   │   │       ├── NewsletterTab.css
│           │   │   │       ├── OverviewTab.css
│           │   │   │       ├── PerformanceTab.css
│           │   │   │       ├── RateLimitsTab.css
│           │   │   │       ├── RequestLogsTab.css
│           │   │   │       ├── RevenueTab.css
│           │   │   │       ├── ServerMetricsTab.css
│           │   │   │       ├── SupportTab.css
│           │   │   │       ├── TestsTab.css
│           │   │   │       ├── ToolsTab.css
│           │   │   │       └── UsersTab.css
│           │   │   └── tabs
│           │   │       ├── ActivityLogsTab.js
│           │   │       ├── DailyTab.js
│           │   │       ├── DbShellTab.js
│           │   │       ├── HealthChecksTab.js
│           │   │       ├── NewsletterTab.js
│           │   │       ├── OverviewTab.js
│           │   │       ├── PerformanceTab.js
│           │   │       ├── RateLimitsTab.js
│           │   │       ├── RequestLogsTab.js
│           │   │       ├── RevenueTab.js
│           │   │       ├── ServerMetricsTab.js
│           │   │       ├── SupportTab.js
│           │   │       ├── TestsTab.js
│           │   │       ├── ToolsTab.js
│           │   │       └── UsersTab.js
│           │   ├── footer.css
│           │   ├── iconMapping.js
│           │   ├── og-default.jpg
│           │   ├── pages
│           │   │   ├── AnalogyPage
│           │   │   │   ├── AnalogyHub.css
│           │   │   │   ├── AnalogyHub.js
│           │   │   │   ├── backround1.jpg
│           │   │   │   └── loading2.png
│           │   │   ├── DailyPage
│           │   │   │   ├── DailyCyberBrief.css
│           │   │   │   ├── DailyCyberBrief.js
│           │   │   │   └── backround7.jpg
│           │   │   ├── GRCpage
│           │   │   │   ├── GRC.css
│           │   │   │   ├── GRC.js
│           │   │   │   └── GRCbackground.jpg
│           │   │   ├── Info
│           │   │   │   ├── BlogPage.js
│           │   │   │   ├── BlogPostPage.js
│           │   │   │   ├── ContactPage.js
│           │   │   │   ├── DemosPage.js
│           │   │   │   ├── ExamsPage.js
│           │   │   │   ├── InfoNavbar.js
│           │   │   │   ├── InfoPage.js
│           │   │   │   ├── PublicLeaderboardPage.js
│           │   │   │   ├── YouTubeEmbed.js
│           │   │   │   ├── css
│           │   │   │   │   ├── BlogPage.css
│           │   │   │   │   ├── ContactPage.css
│           │   │   │   │   ├── DemosPage.css
│           │   │   │   │   ├── ExamsPage.css
│           │   │   │   │   ├── InfoNavbar.css
│           │   │   │   │   ├── InfoPage.css
│           │   │   │   │   └── PublicLeaderboardPage.css
│           │   │   │   ├── images
│           │   │   │   │   ├── 1.webp
│           │   │   │   │   ├── 10.webp
│           │   │   │   │   ├── 11.webp
│           │   │   │   │   ├── 12.webp
│           │   │   │   │   ├── 13.webp
│           │   │   │   │   ├── 14.webp
│           │   │   │   │   ├── 15.webp
│           │   │   │   │   ├── 2.webp
│           │   │   │   │   ├── 3.webp
│           │   │   │   │   ├── 4.webp
│           │   │   │   │   ├── 5.webp
│           │   │   │   │   ├── 6.webp
│           │   │   │   │   ├── 7.webp
│           │   │   │   │   ├── 8.webp
│           │   │   │   │   ├── 9.webp
│           │   │   │   │   ├── CISS.webp
│           │   │   │   │   ├── achi.webp
│           │   │   │   │   ├── analogy.webp
│           │   │   │   │   ├── aplus.webp
│           │   │   │   │   ├── apple.svg
│           │   │   │   │   ├── awscloud.webp
│           │   │   │   │   ├── bonus.webp
│           │   │   │   │   ├── cissp.webp
│           │   │   │   │   ├── cloud.webp
│           │   │   │   │   ├── cloudsec.webp
│           │   │   │   │   ├── colors.webp
│           │   │   │   │   ├── cysa.webp
│           │   │   │   │   ├── data.webp
│           │   │   │   │   ├── exammode.webp
│           │   │   │   │   ├── gamified.webp
│           │   │   │   │   ├── grc.webp
│           │   │   │   │   ├── leader (copy 1).webp
│           │   │   │   │   ├── leader.webp
│           │   │   │   │   ├── linux.webp
│           │   │   │   │   ├── network.webp
│           │   │   │   │   ├── news.webp
│           │   │   │   │   ├── pbqs.webp
│           │   │   │   │   ├── pentest.webp
│           │   │   │   │   ├── rec.webp
│           │   │   │   │   ├── review.webp
│           │   │   │   │   ├── scen.webp
│           │   │   │   │   ├── security.webp
│           │   │   │   │   ├── securityplus.webp
│           │   │   │   │   ├── securityx.webp
│           │   │   │   │   ├── server.webp
│           │   │   │   │   ├── shop.webp
│           │   │   │   │   ├── support.webp
│           │   │   │   │   ├── test.webp
│           │   │   │   │   ├── user1.webp
│           │   │   │   │   ├── user2.webp
│           │   │   │   │   ├── user3.webp
│           │   │   │   │   ├── user6.webp
│           │   │   │   │   ├── user8.webp
│           │   │   │   │   ├── xboost.webp
│           │   │   │   │   └── xploit.webp
│           │   │   │   ├── navbarScrollUtils.js
│           │   │   │   └── videoConfig.js
│           │   │   ├── LegalPages.css
│           │   │   ├── PrivacyPolicy.js
│           │   │   ├── ResourcesPage
│           │   │   │   ├── Resourcebackground.jpg
│           │   │   │   ├── Resources.css
│           │   │   │   └── Resources.js
│           │   │   ├── ScenarioPage
│           │   │   │   ├── ScenarioSphere.css
│           │   │   │   ├── ScenarioSphere.js
│           │   │   │   ├── attacks.js
│           │   │   │   └── backround5.jpg
│           │   │   ├── TermsOfService.js
│           │   │   ├── XploitcraftPage
│           │   │   │   ├── App.css
│           │   │   │   ├── Xploitcraft.js
│           │   │   │   ├── backround2.jpg
│           │   │   │   ├── loading3.png
│           │   │   │   └── logo5.png
│           │   │   ├── auth
│           │   │   │   ├── CreateUsernameForm.js
│           │   │   │   ├── ErrorDisplay.js
│           │   │   │   ├── ForgotPassword.js
│           │   │   │   ├── Login.js
│           │   │   │   ├── OAuthSuccess.js
│           │   │   │   ├── PasswordRequirements.js
│           │   │   │   ├── Register.js
│           │   │   │   ├── ResetPassword.js
│           │   │   │   └── css
│           │   │   │       ├── CreateUsernameForm.css
│           │   │   │       ├── ErrorDisplay.css
│           │   │   │       ├── ForgotPassword.css
│           │   │   │       ├── Login.css
│           │   │   │       ├── PasswordRequirements.css
│           │   │   │       ├── Register.css
│           │   │   │       └── ResetPassword.css
│           │   │   ├── ios
│           │   │   │   ├── AppleLegalPages.css
│           │   │   │   ├── PrivacyPolicyIOS.js
│           │   │   │   └── TermsOfServiceIOS.js
│           │   │   ├── store
│           │   │   │   ├── AchievementPage.js
│           │   │   │   ├── AchievementToast.js
│           │   │   │   ├── DailyStationPage.js
│           │   │   │   ├── LeaderboardPage.js
│           │   │   │   ├── ShopPage.js
│           │   │   │   ├── SupportAskAnythingPage.js
│           │   │   │   ├── UserProfile.js
│           │   │   │   ├── css
│           │   │   │   │   ├── AchievementPage.css
│           │   │   │   │   ├── AchievementToast.css
│           │   │   │   │   ├── DailyStation.css
│           │   │   │   │   ├── LeaderboardPage.css
│           │   │   │   │   ├── ShopPage.css
│           │   │   │   │   ├── SupportAskAnythingPage.css
│           │   │   │   │   └── UserProfile.css
│           │   │   │   ├── slice
│           │   │   │   │   ├── achievementsSlice.js
│           │   │   │   │   ├── shopSlice.js
│           │   │   │   │   └── userSlice.js
│           │   │   │   └── store.js
│           │   │   ├── subscription
│           │   │   │   ├── StripeCheckout.js
│           │   │   │   ├── SubscriptionCancel.js
│           │   │   │   ├── SubscriptionPage.js
│           │   │   │   ├── SubscriptionSuccess.js
│           │   │   │   └── css
│           │   │   │       ├── StripeCheckout.css
│           │   │   │       ├── SubscriptionCancel.css
│           │   │   │       ├── SubscriptionPage.css
│           │   │   │       └── SubscriptionSuccess.css
│           │   │   └── tests
│           │   │       ├── aplus
│           │   │       │   ├── APlusTestList.js
│           │   │       │   └── APlusTestPage.js
│           │   │       ├── aplus2
│           │   │       │   ├── APlusCore2TestPage.js
│           │   │       │   └── AplusCore2TestList.js
│           │   │       ├── awscloud
│           │   │       │   ├── AWSCloudTestList.js
│           │   │       │   └── AWSCloudTestPage.js
│           │   │       ├── casp
│           │   │       │   ├── CaspPlusTestList.js
│           │   │       │   └── CaspPlusTestPage.js
│           │   │       ├── cissp
│           │   │       │   ├── CisspTestList.js
│           │   │       │   └── CisspTestPage.js
│           │   │       ├── cloudplus
│           │   │       │   ├── CloudPlusTestList.js
│           │   │       │   └── CloudPlusTestPage.js
│           │   │       ├── cysa
│           │   │       │   ├── CySAPlusTestList.js
│           │   │       │   └── CySAPlusTestPage.js
│           │   │       ├── dataplus
│           │   │       │   ├── DataPlusTestList.js
│           │   │       │   └── DataPlusTestPage.js
│           │   │       ├── linuxplus
│           │   │       │   ├── LinuxPlusTestList.js
│           │   │       │   └── LinuxPlusTestPage.js
│           │   │       ├── nplus
│           │   │       │   ├── NPlusTestList.js
│           │   │       │   └── NetworkPlusTestPage.js
│           │   │       ├── penplus
│           │   │       │   ├── PenPlusTestList.js
│           │   │       │   └── PenPlusTestPage.js
│           │   │       ├── secplus
│           │   │       │   ├── SecurityPlusTestList.js
│           │   │       │   └── SecurityPlusTestPage.js
│           │   │       └── serverplus
│           │   │           ├── ServerPlusTestList.js
│           │   │           └── ServerPlusTestPage.js
│           │   └── test.css
│           ├── global.css
│           ├── index.js
│           └── reportWebVitals.js
├── nginx
│   ├── logs
│   │   ├── access.log
│   │   └── error.log
│   ├── nginx.conf
│   └── sites-enabled
│       └── reverse_proxy.conf
├── redis
│   └── redis.conf
└── routes.md

63 directories, 320 files
```
