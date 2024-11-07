import logging
import asyncio
import nest_asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Разрешение вложенных событийных циклов
nest_asyncio.apply()

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text('Добро пожаловать! Используйте /play для начала игры.')

async def play(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [[InlineKeyboardButton("Играть в Крестики-нолики", web_app={"url": "https://telegrambotforreact.netlify.app"})]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Нажмите, чтобы начать игру:', reply_markup=reply_markup)

async def main() -> None:
    application = ApplicationBuilder().token("7627260329:AAGWFf4L1RV-dVX76RSK14CCoZmdRgGgdiQ").build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("play", play))

    await application.run_polling()

if __name__ == '__main__':
    asyncio.run(main())
