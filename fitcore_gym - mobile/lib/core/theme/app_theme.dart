import 'package:flutter/material.dart';

/// Clean design tokens aligned with Luminous Athletic Elegance
class FitCoreColors {
  FitCoreColors._();

  // Primary brand
  static const Color primary = Color(0xFFF97316); // Sunburst Orange
  static const Color primaryDark = Color(0xFFEA580C);
  static const Color primaryContainer = Color(0xFFFFEDD5);

  // Surface & Canvas
  static const Color canvas = Color(0xFFFAF9F6); // Soft Ivory Base
  static const Color surface = Color(0xFFFFFFFF); // Crisp Porcelain
  static const Color surfaceMuted = Color(0xFFF8FAFC);
  static const Color border = Color(0xFFF1EBE1); // Soft Sand

  // Functional & Semantic
  static const Color success = Color(0xFF16A34A); // Emerald Check-In
  static const Color successContainer = Color(0xFFDCFCE7);
  static const Color warning = Color(0xFFD97706); // Warm Amber Pending
  static const Color warningContainer = Color(0xFFFEF3C7);
  static const Color error = Color(0xFFDC2626);
  static const Color errorContainer = Color(0xFFFEE2E2);

  // Typography
  static const Color textPrimary = Color(0xFF0F172A); // Slate Charcoal
  static const Color textSecondary = Color(0xFF64748B); // Slate Muted
  static const Color textTertiary = Color(0xFF94A3B8);
}

class FitCoreRadius {
  FitCoreRadius._();

  static const double card = 18.0;
  static const double button = 12.0;
  static const double pill = 999.0;
}
