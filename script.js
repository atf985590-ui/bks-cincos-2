document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 3 ثواني
    setTimeout(() => {
        document.querySelector('.splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.splash-screen').style.display = 'none';
        }, 500);
    }, 3000);

    // تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.querySelector('.login-container');
    const mainContainer = document.querySelector('.main-container');
    const welcomeModal = document.querySelector('.welcome-modal');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'flex';
            
            // إنشاء المحتوى الديناميكي
            createContentSections();
            
            // عرض رسالة الترحيب بعد تسجيل الدخول
            setTimeout(() => {
                welcomeModal.style.display = 'flex';
            }, 500);
        });
    }
    
    // إغلاق رسالة الترحيب
    const okBtn = document.querySelector('.ok-btn');
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            welcomeModal.style.display = 'none';
        });
    }
    
    // إدارة التنقل بين الأقسام
    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                
                // إزالة النشاط من جميع العناصر
                navItems.forEach(navItem => navItem.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // إضافة النشاط للعنصر الحالي
                this.classList.add('active');
                
                // عرض القسم المحدد
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // نوافذ الإيداع والسحب
    const depositBtn = document.querySelector('.deposit-btn');
    const withdrawBtn = document.querySelector('.withdraw-btn');
    const depositModal = document.querySelector('.deposit-modal');
    const withdrawModal = document.querySelector('.withdraw-modal');
    const confirmSubscriptionModal = document.querySelector('.confirm-subscription-modal');
    const confirmWithdrawModal = document.querySelector('.confirm-withdraw-modal');
    const confirmDepositModal = document.querySelector('.confirm-deposit-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            depositModal.style.display = 'flex';
        });
    }
    
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            withdrawModal.style.display = 'flex';
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            depositModal.style.display = 'none';
            withdrawModal.style.display = 'none';
            confirmSubscriptionModal.style.display = 'none';
            confirmWithdrawModal.style.display = 'none';
            confirmDepositModal.style.display = 'none';
        });
    });
    
    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === depositModal) {
            depositModal.style.display = 'none';
        }
        if (e.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
        if (e.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
        if (e.target === confirmSubscriptionModal) {
            confirmSubscriptionModal.style.display = 'none';
        }
        if (e.target === confirmWithdrawModal) {
            confirmWithdrawModal.style.display = 'none';
        }
        if (e.target === confirmDepositModal) {
            confirmDepositModal.style.display = 'none';
        }
    });
    
    // نسخ عناوين المحافظ
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                this.classList.add('copied');
                showNotification('تم نسخ العنوان بنجاح', 'success');
                setTimeout(() => {
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // تغيير مبالغ السحب العشوائية
    function updateRandomAmounts() {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => {
            const randomAmount = Math.floor(Math.random() * 100) + 10;
            amount.textContent = randomAmount;
        });
        
        // تحديث أرقام الهوية كل 3 ثواني
        const userIds = document.querySelectorAll('.user-id');
        userIds.forEach(userId => {
            userId.textContent = `ID: ${generateUserId()}`;
        });
    }
    
    setInterval(updateRandomAmounts, 3000);
    
    // إنشاء محتوى الأقسام ديناميكيًا
    function createContentSections() {
        createHomeContent();
        createVipContent();
        createLeadersContent();
        createInviteContent();
        createTasksContent();
        createProfileContent();
        setupNavigation();
        setupWithdrawMethods();
        setupSubscriptionButtons();
        setupTaskLocks();
    }
    
    function createHomeContent() {
        const homeSection = document.createElement('div');
        homeSection.id = 'home';
        homeSection.className = 'content-section active';
        homeSection.innerHTML = `
            <div class="section-header">
                <h2>الرئيسية</h2>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-wallet"></i>
                    <h3>رصيدك</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-coins"></i>
                    <h3>أرباح اليوم</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>أعضاء فريقك</h3>
                    <p>0</p>
                </div>
            </div>
            <div class="support-section">
                <h3>خدمة العملاء</h3>
                <a href="https://t.me/ta_ta_ta_123" target="_blank" class="support-telegram">
                    <i class="fab fa-telegram"></i> انضم إلى قناتنا على Telegram
                </a>
            </div>
            <button class="agent-btn" id="becomeAgent">
                <i class="fas fa-star"></i> انضم أصبح وكيل - راتب يومي 100-350 USDT
            </button>
        `;
        document.querySelector('.main-content').appendChild(homeSection);
        
        // إعداد زر الانضمام كوكيل
        document.getElementById('becomeAgent').addEventListener('click', function() {
            window.open('https://t.me/ta_ta_ta_123', '_blank');
        });
    }
    
    function createVipContent() {
        const vipSection = document.createElement('div');
        vipSection.id = 'vip';
        vipSection.className = 'content-section';
        vipSection.innerHTML = `
            <div class="section-header">
                <h2>خطط VIP</h2>
                <p>اختر الخطة المناسبة لتبدأ رحلة أرباحك</p>
            </div>
            <div class="vip-scroll">
                <div class="vip-plans">
                    <!-- سيتم إضافة خطط VIP هنا -->
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(vipSection);
        
        // إضافة خطط VIP (20 خطة)
        const vipPlansContainer = vipSection.querySelector('.vip-plans');
        const vipPlans = [
            { level: 1, price: 5, dailyProfit: '0.70$', friendProfit: '1.00$', taskBonus: '0.70$', loginBonus: '0.00$', featured: false, popular: false },
            { level: 2, price: 8, dailyProfit: '0.90$', friendProfit: '1.10$', taskBonus: '0.90$', loginBonus: '1.00$', featured: false, popular: false },
            { level: 3, price: 12, dailyProfit: '1.00$', friendProfit: '1.20$', taskBonus: '1.00$', loginBonus: '1.20$', featured: false, popular: false },
            { level: 4, price: 18, dailyProfit: '4.00$', friendProfit: '4.00$', taskBonus: '5.00$', loginBonus: '2.00$', featured: true, popular: true },
            { level: 5, price: 25, dailyProfit: '2.00$', friendProfit: '2.20$', taskBonus: '2.00$', loginBonus: '2.20$', featured: false, popular: false },
            { level: 6, price: 33, dailyProfit: '2.50$', friendProfit: '2.70$', taskBonus: '2.50$', loginBonus: '2.70$', featured: false, popular: false },
            { level: 7, price: 42, dailyProfit: '3.00$', friendProfit: '3.20$', taskBonus: '3.00$', loginBonus: '3.20$', featured: false, popular: false },
            { level: 8, price: 52, dailyProfit: '3.50$', friendProfit: '3.70$', taskBonus: '3.50$', loginBonus: '3.70$', featured: false, popular: false },
            { level: 9, price: 63, dailyProfit: '4.00$', friendProfit: '4.20$', taskBonus: '4.00$', loginBonus: '4.20$', featured: false, popular: false },
            { level: 10, price: 75, dailyProfit: '4.50$', friendProfit: '4.70$', taskBonus: '4.50$', loginBonus: '4.70$', featured: false, popular: false },
            { level: 11, price: 88, dailyProfit: '5.00$', friendProfit: '5.20$', taskBonus: '5.00$', loginBonus: '5.20$', featured: false, popular: false },
            { level: 12, price: 102, dailyProfit: '5.50$', friendProfit: '5.70$', taskBonus: '5.50$', loginBonus: '5.70$', featured: false, popular: false },
            { level: 13, price: 117, dailyProfit: '6.00$', friendProfit: '6.20$', taskBonus: '6.00$', loginBonus: '6.20$', featured: false, popular: false },
            { level: 14, price: 133, dailyProfit: '6.50$', friendProfit: '6.70$', taskBonus: '6.50$', loginBonus: '6.70$', featured: false, popular: false },
            { level: 15, price: 150, dailyProfit: '7.00$', friendProfit: '7.20$', taskBonus: '7.00$', loginBonus: '7.20$', featured: false, popular: false },
            { level: 16, price: 168, dailyProfit: '7.50$', friendProfit: '7.70$', taskBonus: '7.50$', loginBonus: '7.70$', featured: false, popular: false },
            { level: 17, price: 187, dailyProfit: '8.00$', friendProfit: '8.20$', taskBonus: '8.00$', loginBonus: '8.20$', featured: false, popular: false },
            { level: 18, price: 207, dailyProfit: '8.50$', friendProfit: '8.70$', taskBonus: '8.50$', loginBonus: '8.70$', featured: false, popular: false },
            { level: 19, price: 228, dailyProfit: '9.00$', friendProfit: '9.20$', taskBonus: '9.00$', loginBonus: '9.20$', featured: false, popular: false },
            { level: 20, price: 250, dailyProfit: '10.00$', friendProfit: '10.20$', taskBonus: '10.00$', loginBonus: '10.20$', featured: false, popular: false }
        ];
        
        vipPlans.forEach(plan => {
            const planElement = document.createElement('div');
            let planClass = 'vip-plan';
            if (plan.featured) planClass += ' featured';
            if (plan.popular) planClass += ' popular';
            
            planElement.className = planClass;
            planElement.innerHTML = `
                <div class="plan-header">
                    <h3>VIP ${plan.level}</h3>
                </div>
                <div class="plan-details">
                    <p>سعر الخطة: $${plan.price}</p>
                    <p>الربح اليومي: ${plan.dailyProfit}</p>
                    <p>ربح دعوة صديق: ${plan.friendProfit}</p>
                    <p>مكافأة إكمال المهام: ${plan.taskBonus}</p>
                    ${plan.loginBonus !== '0.00$' ? `<p>مكافأة تسجيل الدخول: ${plan.loginBonus}</p>` : ''}
                </div>
                <button class="subscribe-btn" data-plan="VIP ${plan.level}" data-price="${plan.price}">اشتراك الآن</button>
            `;
            vipPlansContainer.appendChild(planElement);
        });
    }
    
    function createLeadersContent() {
        const leadersSection = document.createElement('div');
        leadersSection.id = 'leaders';
        leadersSection.className = 'content-section';
        leadersSection.innerHTML = `
            <div class="section-header">
                <h2>لوحة المتصدرين</h2>
                <p>أعلى الأرباح من مشاهدة الإعلانات وإكمال المهام والتسجيلات اليومية</p>
            </div>
            <div class="leaders-container">
                <div class="leader-top">
                    <div class="leader-card second">
                        <div class="leader-rank">2</div>
                        <div class="leader-avatar"><i class="fas fa-user"></i></div>
                        <div class="leader-name">سارة أحمد</div>
                        <div class="leader-id">#${Math.floor(1000000 + Math.random() * 9000000)}</div>
                        <div class="leader-vip">VIP 4</div>
                        <div class="leader-stats">
                            <div class="leader-stat">
                                <span class="leader-stat-value">245$</span>
                                <span class="leader-stat-label">أرباح</span>
                            </div>
                        </div>
                    </div>
                    <div class="leader-card first">
                        <div class="leader-rank">1</div>
                        <div class="leader-avatar"><i class="fas fa-crown"></i></div>
                        <div class="leader-name">محمد علي</div>
                        <div class="leader-id">#${Math.floor(1000000 + Math.random() * 9000000)}</div>
                        <div class="leader-vip">VIP 5</div>
                        <div class="leader-stats">
                            <div class="leader-stat">
                                <span class="leader-stat-value">367$</span>
                                <span class="leader-stat-label">أرباح</span>
                            </div>
                        </div>
                    </div>
                    <div class="leader-card third">
                        <div class="leader-rank">3</div>
                        <div class="leader-avatar"><i class="fas fa-user"></i></div>
                        <div class="leader-name">فاطمة حسن</div>
                        <div class="leader-id">#${Math.floor(1000000 + Math.random() * 9000000)}</div>
                        <div class="leader-vip">VIP 3</div>
                        <div class="leader-stats">
                            <div class="leader-stat">
                                <span class="leader-stat-value">198$</span>
                                <span class="leader-stat-label">أرباح</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="leaders-list">
                    <h3>قائمة المتصدرين</h3>
                    <!-- سيتم إضافة قائمة المتصدرين هنا -->
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(leadersSection);
        
        // إضافة قائمة المتصدرين
        const leadersList = leadersSection.querySelector('.leaders-list');
        for (let i = 4; i <= 20; i++) {
            const leaderItem = document.createElement('div');
            leaderItem.className = 'leader-item';
            leaderItem.innerHTML = `
                <div class="leader-item-rank">${i}</div>
                <div class="leader-item-info">
                    <div class="leader-item-name">${getRandomName()}</div>
                    <div class="leader-item-id">#${Math.floor(1000000 + Math.random() * 9000000)}</div>
                </div>
                <div class="leader-item-vip">VIP ${Math.floor(1 + Math.random() * 5)}</div>
                <div class="leader-item-amount">${Math.floor(50 + Math.random() * 200)}$</div>
            `;
            leadersList.appendChild(leaderItem);
        }
    }
    
    function createInviteContent() {
        const inviteSection = document.createElement('div');
        inviteSection.id = 'invite';
        inviteSection.className = 'content-section';
        inviteSection.innerHTML = `
            <div class="section-header">
                <h2>دعوة الأصدقاء</h2>
                <p>ادعُ أصدقاءك واحصل على عمولة تصل إلى 26%</p>
            </div>
            <div class="invite-stats">
                <div class="stat">
                    <h3>عدد المدعوين</h3>
                    <p>0</p>
                </div>
                <div class="stat">
                    <h3>أرباح الإحالات</h3>
                    <p>0.00 $</p>
                </div>
            </div>
            <div class="referral-code">
                <h3>كود الإحالة الخاص بك</h3>
                <div class="code-box">
                    <p>BKS-${Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    <button class="copy-btn">نسخ</button>
                </div>
            </div>
            <div class="invite-instructions">
                <h3>كيفية الدعوة:</h3>
                <p>1. شارك كود الإحالة مع أصدقائك</p>
                <p>2. عند تسجيلهم باستخدام الكود، يصبحون جزءًا من فريقك</p>
                <p>3. احصل على نسبة من أرباحهم</p>
            </div>
            <div class="lock-message">
                <i class="fas fa-lock"></i> هذه الميزة متاحة فقط لأعضاء VIP
            </div>
            <div class="support-section">
                <h3>خدمة العملاء</h3>
                <a href="https://t.me/ta_ta_ta_123" target="_blank" class="support-telegram">
                    <i class="fab fa-telegram"></i> انضم إلى قناتنا على Telegram
                </a>
            </div>
        `;
        document.querySelector('.main-content').appendChild(inviteSection);
    }
    
    function createTasksContent() {
        const tasksSection = document.createElement('div');
        tasksSection.id = 'tasks';
        tasksSection.className = 'content-section';
        tasksSection.innerHTML = `
            <div class="section-header">
                <h2>المهام اليومية</h2>
                <p>أكمل المهام واربح المزيد</p>
            </div>
            <div class="tasks-container">
                <div class="task-card locked">
                    <i class="fas fa-calendar-check"></i>
                    <h3>التسجيل اليومي</h3>
                    <p>سجل دخولك يوميًا لتحصل على مكافأة</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                    <div class="lock-message">
                        <i class="fas fa-lock"></i> اشترك في خطة VIP first
                    </div>
                </div>
                <div class="task-card locked">
                    <i class="fas fa-ad"></i>
                    <h3>مشاهدة الإعلانات</h3>
                    <p>شاهد الإعلانات واربح المال</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                    <div class="lock-message">
                        <i class="fas fa-lock"></i> اشترك في خطة VIP first
                    </div>
                </div>
                <div class="task-card">
                    <i class="fas fa-gamepad"></i>
                    <h3>ألعاب تفاعلية</h3>
                    <p>العب واربح المكافآت</p>
                    <button class="play-btn">لعب</button>
                </div>
            </div>
            <div class="support-section">
                <h3>خدمة العملاء</h3>
                <a href="https://t.me/ta_ta_ta_123" target="_blank" class="support-telegram">
                    <i class="fab fa-telegram"></i> انضم إلى قناتنا على Telegram
                </a>
            </div>
        `;
        document.querySelector('.main-content').appendChild(tasksSection);
    }
    
    function createProfileContent() {
        const profileSection = document.createElement('div');
        profileSection.id = 'profile';
        profileSection.className = 'content-section';
        profileSection.innerHTML = `
            <div class="section-header">
                <h2>حسابي</h2>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <span>اسم المستخدم:</span>
                    <span>مستخدم جديد</span>
                </div>
                <div class="info-item">
                    <span>البريد الإلكتروني:</span>
                    <span>example@email.com</span>
                </div>
                <div class="info-item">
                    <span>رقم ID:</span>
                    <span>BKS-${Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div class="info-item">
                    <span>تاريخ التسجيل:</span>
                    <span>${new Date().toLocaleDateString('ar-EG')}</span>
                </div>
                <div class="info-item">
                    <span>أرباحك:</span>
                    <span>0.00 $</span>
                </div>
            </div>
            <div class="profile-actions">
                <button class="action-btn" id="withdrawalHistory"><i class="fas fa-history"></i> سجلات السحب</button>
                <button class="action-btn"><i class="fas fa-coins"></i> سجلات الإيداع</button>
                <button class="action-btn"><i class="fas fa-cog"></i> الإعدادات</button>
                <button class="action-btn"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</button>
            </div>
            <div class="support-section">
                <h3>خدمة العملاء</h3>
                <a href="https://t.me/ta_ta_ta_123" target="_blank" class="support-telegram">
                    <i class="fab fa-telegram"></i> انضم إلى قناتنا على Telegram
                </a>
            </div>
        `;
        document.querySelector('.main-content').appendChild(profileSection);
        
        // إعداد سجل السحوبات
        document.getElementById('withdrawalHistory').addEventListener('click', function() {
            showNotification('سجل السحوبات فارغ حالياً', 'info');
        });
    }
    
    // إعداد معلومات طرق السحب
    function setupWithdrawMethods() {
        const withdrawOptions = document.querySelectorAll('.withdraw-options .option');
        const withdrawInfo = document.getElementById('withdrawInfo');
        
        const methodDetails = {
            bitcoin: {
                name: "Bitcoin",
                info: "الحد الأدنى للسحب: 0.001 BTC\nالعمولة: 0.0005 BTC\nوقت المعالجة: 1-24 ساعة\n\nيرجى إدخال عنوان محفظة Bitcoin الخاص بك"
            },
            ethereum: {
                name: "Ethereum",
                info: "الحد الأدنى للسحب: 0.01 ETH\nالعمولة: 0.005 ETH\nوقت المعالجة: 1-24 ساعة\n\nيرجى إدخال عنوان محفظة Ethereum الخاص بك"
            },
            usdt: {
                name: "Tether",
                info: "الحد الأدنى للسحب: 10 USDT\nالعمولة: 1 USDT\nوقت المعالجة: 1-24 ساعة\n\nيرجى إدخال عنوان محفظة USDT الخاص بك"
            },
            bnb: {
                name: "Binance Coin",
                info: "الحد الأدنى للسحب: 0.1 BNB\nالعمولة: 0.01 BNB\nوقت المعالجة: 1-24 ساعة\n\nيرجى إدخال عنوان محفظة BNB الخاص بك"
            },
            visa: {
                name: "Visa",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل\n\nيرجى إدخال رقم بطاقة Visa الخاصة بك"
            },
            mastercard: {
                name: "MasterCard",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل\n\nيرجى إدخال رقم بطاقة MasterCard الخاصة بك"
            },
            amex: {
                name: "American Express",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل\n\nيرجى إدخال رقم بطاقة American Express الخاصة بك"
            },
            paypal: {
                name: "PayPal",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل\n\nيرجى إدخال بريدك الإلكتروني المرتبط بحساب PayPal"
            },
            skrill: {
                name: "Skrill",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل\n\nيرجى إدخال بريدك الإلكتروني المرتبط بحساب Skrill"
            },
            neteller: {
                name: "Neteller",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل\n\nيرجى إدخال بريدك الإلكتروني المرتبط بحساب Neteller"
            },
            bank: {
                name: "حوالة بنكية",
                info: "الحد الأدنى للسحب: 50$\nالعمولة: 5$\nوقت المعالجة: 3-7 أيام عمل\n\nيرجى إدخال معلومات الحوالة البنكية"
            },
            mobile: {
                name: "محافظ متنقلة",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: فوري إلى 24 ساعة\n\nيرجى إدخال رقم هاتفك المرتبط بالمحفظة المتنقلة"
            }
        };
        
        withdrawOptions.forEach(option => {
            option.addEventListener('click', function() {
                // إلغاء تحديد جميع الخيارات
                withdrawOptions.forEach(opt => opt.classList.remove('selected'));
                
                // تحديد الخيار الحالي
                this.classList.add('selected');
                
                const method = this.getAttribute('data-method');
                const details = methodDetails[method];
                
                withdrawInfo.innerHTML = `
                    <h3>معلومات السحب - ${details.name}</h3>
                    <div class="method-details">
                        ${details.info.split('\n').map(line => `<p>${line}</p>`).join('')}
                    </div>
                `;
            });
        });
        
        // إعداد تأكيد السحب
        const confirmWithdrawBtn = document.querySelector('.confirm-withdraw');
        if (confirmWithdrawBtn) {
            confirmWithdrawBtn.addEventListener('click', function() {
                const selectedMethod = document.querySelector('.withdraw-options .option.selected');
                const amountInput = document.querySelector('.amount-input input');
                
                if (!selectedMethod) {
                    showNotification('يرجى اختيار طريقة السحب', 'error');
                    return;
                }
                
                if (!amountInput.value || parseFloat(amountInput.value) < 5) {
                    showNotification('الحد الأدنى للسحب هو 5$', 'error');
                    return;
                }
                
                const method = selectedMethod.getAttribute('data-method');
                const details = methodDetails[method];
                const amount = parseFloat(amountInput.value);
                const fee = calculateWithdrawalFee(amount, method);
                const total = amount - fee;
                
                // تحديث معلومات السحب في نافذة التأكيد
                document.getElementById('withdraw-amount').textContent = amount.toFixed(2) + '$';
                document.getElementById('withdraw-method').textContent = details.name;
                document.getElementById('withdraw-fee').textContent = fee.toFixed(2) + '$';
                document.getElementById('withdraw-total').textContent = total.toFixed(2) + '$';
                
                // عرض نافذة تأكيد السحب
                confirmWithdrawModal.style.display = 'flex';
            });
        }
        
        // تأكيد السحب النهائي
        const confirmWithdrawFinalBtn = document.querySelector('.confirm-withdraw-final');
        if (confirmWithdrawFinalBtn) {
            confirmWithdrawFinalBtn.addEventListener('click', function() {
                const addressInput = document.querySelector('.address-input input');
                
                if (!addressInput.value) {
                    showNotification('يرجى إدخال عنوان المحفظة', 'error');
                    return;
                }
                
                confirmWithdrawModal.style.display = 'none';
                withdrawModal.style.display = 'none';
                
                showNotification('تم إرسال طلب السحب بنجاح', 'success');
            });
        }
    }
    
    // إعداد أزرار الاشتراك
    function setupSubscriptionButtons() {
        const subscribeButtons = document.querySelectorAll('.subscribe-btn');
        const confirmSubscriptionModal = document.querySelector('.confirm-subscription-modal');
        const depositModal = document.querySelector('.deposit-modal');
        const confirmDepositBtn = document.querySelector('.confirm-deposit');
        
        subscribeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                const price = this.getAttribute('data-price');
                
                // تحديث معلومات الخطة في نافذة التأكيد
                confirmSubscriptionModal.querySelector('.plan-name').textContent = plan;
                
                // عرض نافذة التأكيد
                confirmSubscriptionModal.style.display = 'flex';
                
                // عند النقر على الانتقال إلى صفحة الإيداع
                const viewDepositBtn = confirmSubscriptionModal.querySelector('.view-deposit');
                viewDepositBtn.onclick = function() {
                    confirmSubscriptionModal.style.display = 'none';
                    
                    // تحديث معلومات الخطة في نافذة الإيداع
                    document.getElementById('selectedPlan').textContent = plan;
                    document.getElementById('planPrice').textContent = price;
                    
                    // عرض نافذة الإيداع
                    depositModal.style.display = 'flex';
                };
            });
        });
        
        // تأكيد الإيداع
        if (confirmDepositBtn) {
            confirmDepositBtn.addEventListener('click', function() {
                depositModal.style.display = 'none';
                confirmDepositModal.style.display = 'flex';
                
                // إخفاء نافذة التأكيد بعد 3 ثواني
                setTimeout(() => {
                    confirmDepositModal.style.display = 'none';
                    showNotification('جاري التحقق من عملية الإيداع', 'info');
                }, 3000);
            });
        }
    }
    
    // إعداد أقفال المهام
    function setupTaskLocks() {
        const taskCards = document.querySelectorAll('.task-card.locked');
        
        taskCards.forEach(card => {
            card.addEventListener('click', function() {
                showNotification('يجب الاشتراك في خطة VIP first لفتح هذه الميزة', 'info');
            });
        });
    }
    
    // وظيفة مساعدة للحصول على أسماء عشوائية
    function getRandomName() {
        const names = [
            "أحمد محمد", "محمد علي", "محمود حسن", "خالد إبراهيم", "عمر سعيد",
            "سارة أحمد", "فاطمة محمد", "ريم خالد", "نورة عبدالله", "لينا علي",
            "يوسف أحمد", "عبدالله سعد", "تركي ناصر", "بدر عبدالكريم", "سلطان فهد",
            "أسماء عبدالرحمن", "شهد محمد", "الجوهرة ناصر", "روضة سعود", "وجدان علي"
        ];
        return names[Math.floor(Math.random() * names.length)];
    }
    
    // إنشاء رقم هوية عشوائي
    function generateUserId() {
        return Math.floor(1000000 + Math.random() * 9000000);
    }
    
    // حساب عمولة السحب
    function calculateWithdrawalFee(amount, method) {
        const fees = {
            bitcoin: amount * 0.05,
            ethereum: amount * 0.05,
            usdt: amount * 0.03,
            bnb: amount * 0.03,
            visa: amount * 0.1,
            mastercard: amount * 0.1,
            amex: amount * 0.1,
            paypal: amount * 0.05,
            skrill: amount * 0.05,
            neteller: amount * 0.05,
            bank: amount * 0.1,
            mobile: amount * 0.05
        };
        
        return fees[method] || amount * 0.05;
    }
    
    // عرض الإشعارات
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = 'fas fa-info-circle';
        if (type === 'success') icon = 'fas fa-check-circle';
        if (type === 'error') icon = 'fas fa-exclamation-circle';
        if (type === 'info') icon = 'fas fa-info-circle';
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
